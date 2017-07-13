'use strict';

const Form = require('./../model/formModel');

const formController = {

  createForm(req, res, next) {
    const job = req.body;
    job.userID = req.cookies.ssid;
    Form.create(job, (err, aJob)=>{
      if (!err){
        res.status(200);
        res.json(aJob);
      } else {
        next(err);
      }
    });
  },

  pullData(req, res, next) {
    Form.find({}, (err, jobs) => {
      if (err) return err;
      res.json(jobs);
    });
  },

  myJobs(req, res, next) {
    const uid = req.cookies.ssid;
    Form.find({'userID': uid}, (err, jobs) => {
      if (err){
        next(err);
      }
      res.json(jobs);
    });
  },

  claims(req, res, next) {
    const uid = req.cookies.ssid;
    Form.find({'claimant': uid}, (err, claims) => {
      if (err) next(err);
      res.json(claims);
    });
  },


  deleteJob(req, res, next) {
    const job = req.body;
    job.userID = req.cookies.ssid;
    Form.deleteOne(job, (err, aJob)=>{
      if (!err) {
        res.status(200);
        res.json(job);
      } else {
        next(err);
      }
    });
  },

  updateJob(req, res, next) {
    const job = req.body;
    job.userID = req.cookies.ssid;
    Form.where({title: job.title}).updateOne(job, (err, result) => {
      if (!err) {
        res.status(200);
        res.json(job);
        return;
      } else {
        next(err);
      }
    });
  }
}

module.exports = formController;
