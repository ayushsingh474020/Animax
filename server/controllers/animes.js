import mongoose from "mongoose";
import { createError } from "../error.js";
import Animes from "../models/Animes.js";
import Episodes from "../models/Episodes.js";
import User from "../models/User.js";


export const createAnime = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        let episodeList = []
        await Promise.all(req.body.episodes.map(async (item) => {

            const episode = new Episodes(
                { creator: user.id, ...item }
            );
            const savedEpisode = await episode.save();
            episodeList.push(savedEpisode._id)
        }));

        // Create a new anime
        const anime = new Animes(
            {
                creator: user.id, episodes: episodeList,
                name: req.body.name,
                desc: req.body.desc,
                thumbnail: req.body.thumbnail,
                tags: req.body.tags,
                type: req.body.type,
                category: req.body.category
            }
        );
        const savedAnime = await anime.save();

        //save the anime to the user
        await User.findByIdAndUpdate(user.id, {
            $push: { animes: savedAnime.id },

        }, { new: true });

        res.status(201).json(savedAnime);
    } catch (err) {
        next(err);
    }
};

export const addepisodes = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        await Promise.all(req.body.episodes.map(async (item) => {

            const episode = new Episodes(
                { creator: user.id, ...item }
            );
            const savedEpisode = await episode.save();


            // update the anime
            await Animes.findByIdAndUpdate(
                req.body.podid, {
                $push: { episodes: savedEpisode.id },

            }, { new: true }
            )
        }));

        res.status(201).json({ message: "Episode added successfully" });

    } catch (err) {
        next(err);
    }
}



export const getAnimes = async (req, res, next) => {
    try {
        // Get all animes from the database
        const animes = await Animes.find().populate("creator", "name img").populate("episodes");
        return res.status(200).json(animes);
    } catch (err) {
        next(err);
    }
};

export const getAnimeById = async (req, res, next) => {
    try {
        // Get the animes from the database
        const anime = await Animes.findById(req.params.id).populate("creator", "name img").populate("episodes");
        return res.status(200).json(anime);
    } catch (err) {
        next(err);
    }
};

export const favoritAnime = async (req, res, next) => {
    // Check if the user is the creator of the anime
    const user = await User.findById(req.user.id);
    const anime = await Animes.findById(req.body.id);
    let found = false;
    if (user.id === anime.creator) {
        return next(createError(403, "You can't favorit your own anime!"));
    }

    // Check if the anime is already in the user's favorits
    await Promise.all(user.favorits.map(async (item) => {
        if (req.body.id == item) {
            //remove from favorite
            found = true;
            console.log("this")
            await User.findByIdAndUpdate(user.id, {
                $pull: { favorits: req.body.id },

            }, { new: true })
            res.status(200).json({ message: "Removed from favorit" });

        }
    }));


    if (!found) {
        await User.findByIdAndUpdate(user.id, {
            $push: { favorits: req.body.id },

        }, { new: true });
        res.status(200).json({ message: "Added to favorit" });
    }
}

//add view 

export const addView = async (req, res, next) => {
    try {
      await Animes.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 },
      });
      res.status(200).json("The view has been increased.");
    } catch (err) {
      next(err);
    }
  };
  


//searches
export const random = async (req, res, next) => {
    try {
        const animes = await Animes.aggregate([{ $sample: { size: 40 } }]).populate("creator", "name img").populate("episodes");
        res.status(200).json(animes);
    } catch (err) {
        next(err);
    }
};

export const mostpopular = async (req, res, next) => {
    try {
        const anime = await Animes.find().sort({ views: -1 }).populate("creator", "name img").populate("episodes");
        res.status(200).json(anime);
    } catch (err) {
        next(err);
    }
};

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const anime = await Animes.find({ tags: { $in: tags } }).populate("creator", "name img").populate("episodes");
        res.status(200).json(anime);
    } catch (err) {
        next(err);
    }
};

export const getByCategory = async (req, res, next) => {
    const query = req.query.q;
    try {
        const anime = await Animes.find({ 
            
        category: { $regex: query, $options: "i" },
        }).populate("creator", "name img").populate("episodes");
        res.status(200).json(anime);
    } catch (err) {
        next(err);
    }
};

export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
      const anime = await Animes.find({
        name: { $regex: query, $options: "i" },
      }).populate("creator", "name img").populate("episodes").limit(40);
      res.status(200).json(anime);
    } catch (err) {
      next(err);
    }
  };