import React from 'react'
import mask from "../images/masks.png"
import anti_aging from "../images/antiaging.png";
import bathNbody from "../images/bodyAndBath.png"
import blush from "../images/blush.png"
import candles from "../images/candles.png"
import eyeshadow from "../images/eyeshadow.png"
import faceserum from "../images/faceserum.png"
import facewash from "../images/facewash.png"
import hairaccess from "../images/hairaccess.png"
import lipgloss from "../images/lipgloss.png"
import bodyoil from "../images/bodyoil.png"
import makeup from "../images/makeup.png"
import moist from "../images/moist.png"
import perfume from "../images/perfume.png"
import brush from "../images/brush.png"


const categories = 
  [
    {id: 1,
     category_name: "Masks",
     picture: mask
    },
    {id: 2,
      category_name: "Anti-Aging",
      picture: anti_aging
    },
    
    {id: 3,
      category_name: "Bath & Body",
      picture: bathNbody
    },
    
    {id: 4,
      category_name: "Blush",
      picture: blush
    },
    
    {id: 5,
      category_name: "Candles & Home Scents",
      picture: candles
    },

    {id: 6,
      category_name: "Eyeshadow",
      picture: eyeshadow
     },
     {id: 7,
       category_name: "Face Serums",
       picture: faceserum
     },
     
     {id: 8,
       category_name: "Face wash & Cleansers",
       picture: facewash
     },
     
     {id: 9,
       category_name: "Hair Accessories",
       picture: hairaccess
     },
     
     {id: 10,
       category_name: "Lip Gloss",
       picture: lipgloss
     },
     {id: 11,
      category_name: "Lotions & Oils",
      picture: bodyoil
    },
    
    {id: 12,
      category_name: "Makeup & Travel Cases",
      picture: makeup
    },
    
    {id: 13,
      category_name: "Moisturizers & Treatments",
      picture: moist
    },
    
    {id: 14,
      category_name: "Perfume",
      picture: perfume
    },

    {id: 15,
      category_name: "Brush Set",
      picture: brush
    }
  ];


export default categories;