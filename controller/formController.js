'use strict';

const Form = require('./../model/formModel');

const formController = {

  createForm(req, res, next) {
    const job = req.body;
    job.userID = req.cookies.ssid;
    Form.create(job, (err, aJob)=>{
      if (err){
        res.status(418);
        res.json(job);
        return;
      }
        res.status(200);
        res.json(aJob);
    });
  },

  pullData(req, res, next) {
    Form.find({}, (err, jobs) => {
      if (err) return err;
      res.json(jobs);
    });
  },


  deleteJob(req, res, next) {
    const job = req.body;
    job.userID = req.cookies.ssid;
    Form.deleteOne(job, (err, aJob)=>{
      if (err) {
        res.status(418);
        res.json(job);
        return;
      }
        res.status(200);
        res.json(job);
    });
  },

  updateJob(req, res, next) {
    const job = req.body;
    job.userID = req.cookies.ssid;
    Form.where({title: job.title}).updateOne(job, (err, result) => {
      if (err) {
        res.status(418);
        res.json(job);
        return;
      }
        res.status(200);
        res.json(job);
        return;
    });
  }
}

module.exports = formController;
