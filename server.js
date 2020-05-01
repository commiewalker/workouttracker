const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouttrackerdb", { useNewUrlParser: true });
mongoose.connect(process.env.MONGODB_URI || "mongodb://user1:password1@ds129085.mlab.com:29085/heroku_zzlf848h", { useMongoClient: true });

app.get("/", function (req, res) {
  db.Workout.find().sort({_id:-1}).lean()
    .populate("exercise")
    .then(workOutData => {
      const hbsObject = {
        woName: workOutData[0].name,
        woDate: workOutData[0].date,
        exercise: workOutData[0].exercise,
        woNameP: workOutData[1].name,
        woDateP: workOutData[1].date,
        exerciseP: workOutData[1].exercise
      };
      res.render("index",hbsObject)
    })
    .catch(err => {
      res.json(err);
    });
})

app.post("/workout", ({body}, res) => {
  db.Workout.create(body)  
    .then(newWO => {
      res.redirect("/");
    })
    .catch(({ message }) => {
      res.json(message);
    });
});

app.post("/exercise", ({body}, res) => {
  db.Workout.find().sort({_id:-1})  // GET last item
  .then(recentWO => {         

    db.Exercise.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({ name: recentWO[0].name }, { $push: {exercise: _id} } , { new: true }))
    .then(newX => {
      res.redirect("/");
    })
    .catch(({ message }) => {
      res.json(message)
    });
  })
      

})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
