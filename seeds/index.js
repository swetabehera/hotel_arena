const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Hotel = require('../models/hotel');

mongoose.connect('mongodb://localhost:27017/hotel-arena', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Hotel.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const price213 = Math.floor(Math.random() * 10000) + 10;
        const random213 = Math.floor(Math.random() * 213);
        const hotel = new Hotel({
            author: '62713ec1b7dc11727772b0cd',
            location: `${cities[random213].city}, ${cities[random213].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price: price213,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random213].longitude,
                    cities[random213].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dpl4v7ur6/image/upload/v1651611175/Hotel%20Arena/photo-1651376589993-e0b37872f3e7_ymfg1g.jpg',
                    filename: 'photo-1651376589993-e0b37872f3e7_ymfg1g'
                },
                {
                    url: 'https://res.cloudinary.com/dpl4v7ur6/image/upload/v1651611406/Hotel%20Arena/rydt7emjoric5hskpwdu.jpg',
                    filename: 'rydt7emjoric5hskpwdu'
                }
            ]
        })
        await hotel.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})