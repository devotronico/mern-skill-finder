const mongoose = require('mongoose');
// const config = require('config');
// const geocoder = require('../utils/geocoder');
// const geolib = require('geolib');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  isFavorite: {
    type: Number,
    default: 1
  },
  isInterviewed: {
    type: Number,
    default: 1
  },
  stars: {
    type: Number,
    default: 0
  },
  worked: {
    type: String
  },
  note: {
    type: String
  },
  address: {
    type: String
  },
  distance: {
    type: Number,
    default: 0
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      address: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        required: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        required: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

/**
 * Geocode & create location
 * prima di salvare i dati nel database
 * crea dall'indirizzo fornito dall'utente
 * location.type
 * location.coordinates: longitudine, latitudine
 * location.formattedAddress
 */
// ProfileSchema.pre('save', async function(next) {
//   if (this.address) {
//     const loc = await geocoder.geocode(this.address);
//     this.location = {
//       type: 'Point',
//       coordinates: [loc[0].longitude, loc[0].latitude],
//       formattedAddress: loc[0].formattedAddress
//     };

//     if (this.role !== 'admin') {
//       this.distance = geolib.getDistance(
//         {

//           latitude: config.get('LATITUDE'),
//           longitude: config.get('LONGITUDE')
//         },
//         { latitude: loc[0].latitude, longitude: loc[0].longitude }
//       );
//     }
//   }

//   // this.address = undefined; // Do not save address
//   next();
// });

module.exports = Profile = mongoose.model('profile', ProfileSchema);
