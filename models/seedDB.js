const mongoose = require("mongoose"),
        Camp = require("./campground"),
        Comment= require("./comment")
        
        
mongoose.connect("mongodb://localhost/v2_yelpCamp")


const data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        descript: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        descript: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        descript: "blah blah blah"
    },
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        descript: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        descript: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        descript: "blah blah blah"
    }
]


function seedDB(){
    Camp.remove({}, function(err){
            if (!err){
                Comment.remove({}, function(err){
                    if (!err){
                        data.forEach(function(seed){
                            Camp.create(seed, function(err, newCampground){
                                if (!err){
                                    const comments = [
                                        {
                                            content:"asdjasdkjahsdkjahkjedhqwoieh,a,shdlaksehdajkhasejkhfskjhasd",
                                            author:"OP"
                                        },
                                        {
                                            content:"asdjasdkjahsdkjahkjedhqwoieh,a,shdlaksehdajkhasejkhfskjhasd",
                                            author:"OP"
                                        },
                                        {
                                            content:"asdjasdkjahsdkjahkjedhqwoieh,a,shdlaksehdajkhasejkhfskjhasd",
                                            author:"OP"
                                        },
                                        {
                                            content:"asdjasdkjahsdkjahkjedhqwoieh,a,shdlaksehdajkhasejkhfskjhasd",
                                            author:"OP"
                                        },
                                    
                                    ]
                                    comments.forEach(function(seed) {
                                        Comment.create(seed, function(err, newComment){
                                            newCampground.comments.push(newComment)
                                            newCampground.save()
                                        })
                                    })
                                    
                                }
                            })
                        })
                    }
                })
            }
        })    
}

module.exports = seedDB