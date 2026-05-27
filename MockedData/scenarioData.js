import { color } from "three/tsl";

export const scenarios_data = [
// ------------------------ VALENTINE-------------------------------
    {   
        "id" : "Valentine",
        "modelPath": "Models/Valentine/Valentine.glb", 
        "camera": {
            "position": { "x": -24.48, "y": 7.80, "z": 68.90 },
            "target": { "x": -22.05, "y": -0.50, "z": 90.74 },
            "up": { "x": 0, "y": 1, "z": 0 }
        },

        // Blender (X, Z, -Y)
        // Three.js (X, Y, Z)
        "npcs": [
            // {
            //     "modelPath": "Models/Characters/Business_man/Business_man_01.glb",
            //     "name": "Cowboy",
            //     "position": [-30.61, 0.21, 86.35],
            //     "rotation": [0, 90, 0],
            //     "animationList" : ["Sit_idle"]
            // },

            {
                "modelPath": "Models/Characters/Cowboy/Cowboy_01.glb",
                "name": "Cowboy",
                "position": [-26.59, 0, 93.04],
                "rotation": [0, 90, 0],
                "animationList" : ["Talk_01", "Talk_02", "Talk_03", "Talk_04"]
            },


        ],
        
        "lights" : {
            "directional" : {
                "position" : [32.8, 42.8, 3.2],
                "color" : '#ead380',
                "intensity" : 4
            },

            "ambient" : {
                "color" : '#71a2a2',
                "intensity" : 1.305
            }
        },
        "post_processing" : {
            "bloom" : {
                "strength" : 0.087,
                "radius" : 1.238,
                "threshold" : 0.263
            }
        },

        "sky" : {
            "clouds" : false,
            "topColor": 0x0077ff,
            "bottomColor": 0xffffff,
        },

        "enviroments" : [
            {
                "id" : "Saloon",
                "modelPath": "Models/Valentine/Saloon.glb", 
                "previewCamera" : {
                    "position": { "x": -24.17, "y": 3.40, "z": 104.99 },
                    "target": { "x": -26.92, "y": 3.50, "z": 108.85 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": -2.01, "y": 2.58, "z": 4.68 },
                    "target": { "x": -0.86, "y": 1.06, "z": 1.74 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [77.2, 32.8, 3.2],
                        "color" : '#ecbfbb',
                        "intensity" : 4.35
                    },

                    "ambient" : {
                        "color" : '#9e8670',
                        "intensity" : 0.897
                    }
                },
                "post_processing" : {
                    "bloom" : {
                        "strength" : 0.27,
                        "radius" : 0.82,
                        "threshold" : 0.422
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x0077ff,
                    "bottomColor": 0xffffff,
                },

                "enviroments" : [
                    {
                        "id": "Bar",
                        "enviroments" : [],
                        "previewCamera": {
                            "position": { "x": 2.69, "y": 0.71, "z": -1.06 },
                            "target": { "x": 2.73, "y": 0.62, "z": -1.70 },
                            "up": { "x": 0, "y": 1, "z": 0 }
                        } 
                    }, 

                    {
                        "id": "Black_jack",
                        "enviroments" : [],
                        "previewCamera": {
                            "position": { "x": 1.16, "y": 0.73, "z": 1.72 },
                            "target": { "x": -0.14, "y": 0.19, "z": 0.82 },
                            "up": { "x": 0, "y": 1, "z": 0 }
                        }

                    },
                ]
            },

            {
                "id" : "Stable",
                "modelPath": "Models/Valentine/Stable.glb", 
                "previewCamera": {
                    "position": { "x": -21.50, "y": 2.49, "z": 87.45 },
                    "target": { "x": -11.62, "y": 1.95, "z": 86.82 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": -10.99, "y": 1.50, "z": 87.50 },
                    "target": { "x": 15.88, "y": -3.19, "z": 80.16 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [136, 165.6, 101.6],
                        "color" : '#b1a07c',
                        "intensity" : 5.21
                    },

                    "ambient" : {
                        "color" : '#dfcebf',
                        "intensity" : 1.377
                    }
                },
                "post_processing" : {
                    "bloom" : {
                        "strength" : 0.789,
                        "radius" : 1.09,
                        "threshold" : 0.312
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x0077ff,
                    "bottomColor": 0xffffff,
                },

                "enviroments" : []
            },

            {
                "id" : "Bank",
                "modelPath": "Models/Valentine/Bank.glb", 
                "previewCamera": {
                    "position": { "x": -24.83, "y": 2.56, "z": 101.55 },
                    "target": { "x": -30.44, "y": 2.99, "z": 102.48 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": 11.74, "y": -1.42, "z": 1.00 },
                    "target": { "x": 13.63, "y": -1.78, "z": 0.82 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [86.8, 180.4, 136],
                        "color" : '#ecdfbb',
                        "intensity" : 4.22
                    },

                    "ambient" : {
                        "color" : '#dbc6b3',
                        "intensity" : 1.377
                    }
                },
                "post_processing" : {
                    "bloom" : {
                        "strength" : 0.42,
                        "radius" : 0.894,
                        "threshold" : 0.299
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x0077ff,
                    "bottomColor": 0xffffff,
                },

                "enviroments" : []
            },

            {
                "id" : "Hotel",
                "modelPath": "Models/Valentine/Hotel.glb", 
                "previewCamera": {
                    "position": { "x": -25.07, "y": 3.20, "z": 82.85 },
                    "target": { "x": -30.73, "y": 3.18, "z": 83.58 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": 4.20, "y": 0.67, "z": -1.03 },
                    "target": { "x": -37.64, "y": -10.32, "z": 7.35 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [106.4, -6.4, 3.2],
                        "color" : '#cdc3ad',
                        "intensity" : 2.87
                    },

                    "ambient" : {
                        "color" : '#bcb094',
                        "intensity" : 1.377
                    }
                },
                "post_processing" : {
                    "bloom" : {
                        "strength" : 1.083,
                        "radius" : 1.116,
                        "threshold" : 0.459
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x0077ff,
                    "bottomColor": 0xffffff,
                },

                "enviroments" : []
            },

            {
                "id" : "Jail",
                "modelPath": "Models/Valentine/Jail.glb", 
                "previewCamera": {
                    "position": { "x": -16.51, "y": 2.73, "z": 115.77 },
                    "target": { "x": -15.50, "y": 2.71, "z": 115.61 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": -8.04, "y": -0.42, "z": 0.45 },
                    "target": { "x": -2.72, "y": -1.05, "z": -0.53 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [-60.4, 32.8, 18],
                        "color" : '#8c8269',
                        "intensity" : 8.16
                    },

                    "ambient" : {
                        "color" : '#dbc6b3',
                        "intensity" : 1.377,
                    }
                },
                "post_processing" : {
                    "bloom" : {
                        "strength" : 0.42,
                        "radius" : 1.042,
                        "threshold" : 0.299
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x0077ff,
                    "bottomColor": 0xffffff,
                },

                "enviroments" : []
            },

            {
                "id" : "Trading_post",
                "modelPath": "Models/Valentine/Trading_post.glb", 
                "previewCamera" : {
                    "position": { "x": -18.04, "y": 2.76, "z": 103.78 },
                    "target": { "x": -7.63, "y": 2.78, "z": 102.08 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": -9.08, "y": 2.19, "z": 103.10 },
                    "target": { "x": 20.23, "y": 1.94, "z": 95.67 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [-26, 52.4, 3.2],
                        "color" : '#b6ac96',
                        "intensity" : 5.21
                    },

                    "ambient" : {
                        "color" : '#dfcebf',
                        "intensity" : 1.377
                    }
                },
                "post_processing" : {
                    "bloom" : {
                        "strength" : 0.492,
                        "radius" : 0.722,
                        "threshold" : 0.471
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x0077ff,
                    "bottomColor": 0xffffff,
                },

                "enviroments" : []
            },
            
        ]

    },
// ------------------------ ARMADILLO -------------------------------
    {   
        "id" : "Armadillo",
        "modelPath": "Models/Armadillo/Armadillo.glb", 
        "camera": {
            "position": { "x": -26.35, "y": 4.77, "z": -5.97 },
            "target": { "x": 11.43, "y": -13.35, "z": -17.52 },
            "up": { "x": 0, "y": 1, "z": 0 }
        },

        "lights" : {
            "directional" : {
                "position" : [-200, 32.6, 200],
                "color" : '#f5a614',
                "intensity" : 4.1
            },

            "ambient" : {
                "color" : '#bda461',
                "intensity" : 1.968
            }
        },
        "post_processing" : {
            "bloom" : {
                "strength" : 1.674,
                "radius" : 0.402,
                "threshold" : 0.435
            }
        },

        "sky" : {
            "clouds" : false,
            "topColor": 0x6699cc,
            "bottomColor": 0xffaa66,
        },

        "enviroments" : [
            {
                "id" : "Saloon",
                "modelPath": "Models/Armadillo/Saloon.glb", 
                "previewCamera" : {
                    "position": { "x": -17.75, "y": -1.37, "z": -12.86 },
                    "target": { "x": -17.36, "y": -3.62, "z": -31.08 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": -0.74, "y": 2.40, "z": 3.65 },
                    "target": { "x": -0.35, "y": 1.31, "z": 1.69 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [-1.6, -50.8, 32.8],
                        "color" : '#f5a614',
                        "intensity" : 10
                    },

                    "ambient" : {
                        "color" : '#bda461',
                        "intensity" : 1.968
                    }
                },
                "post_processing" : {
                    "bloom" : {
                        "strength" : 0.603,
                        "radius" : 1.188,
                        "threshold" : 0.484
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x6699cc,
                    "bottomColor": 0xffaa66,
                },

                "enviroments" : [
                    {
                        "id": "Bar",
                        "enviroments" : [],
                        "previewCamera": {
                            "position": { "x": 0.48, "y": 1.91, "z": -1.61 },
                            "target": { "x": 0.47, "y": 1.76, "z": -2.18 },
                            "up": { "x": 0, "y": 1, "z": 0 }
                        } 
                    }, 

                    {
                        "id": "Black_jack",
                        "enviroments" : [],
                        "previewCamera": {
                            "position": { "x": -0.70, "y": 1.97, "z": 2.72 },
                            "target": { "x": -0.79, "y": 0.66, "z": 0.52 },
                            "up": { "x": 0, "y": 1, "z": 0 }
                        }

                    },
                ]
            },

            {
                "id" : "Gun_shop",
                "modelPath": "Models/Armadillo/Gun_shop.glb", 
                "previewCamera" : {
                    "position": { "x": 0.72, "y": -0.68, "z": -14.27 },
                    "target": { "x": 18.89, "y": -2.32, "z": -14.00 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": 0.36, "y": 1.80, "z": -1.08 },
                    "target": { "x": 10.18, "y": -3.57, "z": 12.26 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [-11.6, -36, 200],
                        "color" : '#f5a614',
                        "intensity" : 5.88
                    },

                    "ambient" : {
                        "color" : '#bda461',
                        "intensity" : 1.00
                    }
                },
                "post_processing" : {
                    "bloom" : {
                        "strength" : 0.27,
                        "radius" : 1.238,
                        "threshold" : 0.189
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x6699cc,
                    "bottomColor": 0xffaa66,
                },

                "enviroments" : []
            },

            {
                "id" : "Trading_post",
                "modelPath": "Models/Armadillo/Trading_post.glb", 
                "previewCamera" : {
                    "position": { "x": 0.86, "y": -1.15, "z": -5.95 },
                    "target": { "x": 0.54, "y": -0.77, "z": 5.26 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": 0.10, "y": 1.83, "z": 0.02 },
                    "target": { "x": 14.77, "y": -2.41, "z": 8.39 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [136, 13.2, -1.6],
                        "color" : '#f5a614',
                        "intensity" : 3.24
                    },

                    "ambient" : {
                        "color" : '#bda461',
                        "intensity" : 1.932
                    }
                },
                "post_processing" : {
                    "bloom" : {
                        "strength" : 0.162,
                        "radius" : 0.796,
                        "threshold" : 0.189
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x6699cc,
                    "bottomColor": 0xffaa66,
                },

                "enviroments" : []
            }
           
        ]
    },

    // ----------------------- REDROCK -------------------------------
    {
        "id" : "Redrock",
        "modelPath": "Models/Redrock/Redrock.glb", 
        "camera": {
            "position": { "x": 0.30, "y": 1.13, "z": -12.36},
            "target": { "x": 0.20, "y": 0.00, "z": -16.17 },
            "up": { "x": 0, "y": 1, "z": 0 }
        },

        "lights" : {
            "directional" : {
                "position" : [77.2, 23.2, 32.8],
                "color" : '#f89d66',
                "intensity" : 2.5
            },

            "ambient" : {
                "color" : '#e65f33',
                "intensity" : 1.413
            }
        },

        "post_processing" : {
            "bloom" : {
                "strength" : 0.492,
                "radius" : 0.992,
                "threshold" : 0.496
            }
        },

        "sky" : {
            "clouds" : false,
            "topColor": 0xff4500,
            "bottomColor": 0xffcc88,
        },

        "enviroments" : [
            {
                "id" : "Stable",
                "modelPath": null, 
                "previewCamera" : {
                    "position": { "x": 1.76, "y": -1.39, "z": -23.75 },
                    "target": { "x": 4.64, "y": -1.86, "z": -23.75 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": null,
                "enviroments" : []
            },

            {
                "id" : "Trading_post",
                "modelPath": "Models/Redrock/Trading_post.glb", 
                "previewCamera" : {
                    "position": { "x": 0.01, "y": -0.76, "z": -38.76 },
                    "target": { "x": -12.01, "y": -0.23, "z": -39.17 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                     "position": { "x": -8.58, "y": 2.35, "z": 100.20 },
                    "target": { "x": 0.45, "y": 1.34, "z": 103.42 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [-21.2, 28, 3.2],
                        "color" : '#f89d66',
                        "intensity" : 2.63
                    },

                    "ambient" : {
                        "color" : '#e65f33',
                        "intensity" : 0.309
                    }
                },
                
                "post_processing" : {
                    "bloom" : {
                        "strength" : 0.42,
                        "radius" : 1.09,
                        "threshold" : 0.103
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0xff4500,
                    "bottomColor": 0xffcc88,
                },

                "enviroments" : []
            },

            {
                "id" : "Jail",
                "modelPath": "Models/Redrock/Jail.glb", 
                "previewCamera" : {
                    "position": { "x": 2.04, "y": -0.99, "z": -35.65 },
                    "target": { "x": 6.53, "y": -1.24, "z": -35.65 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": -7.64, "y": -0.49, "z": 0.55 },
                    "target": { "x": 11.97, "y": -1.28, "z": -3.97 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [-109.6, -6.4, -200],
                        "color" : '#f89d66',
                        "intensity" : 2.38
                    },

                    "ambient" : {
                        "color" : '#e65f33',
                        "intensity" : 0.639
                    }
                },
                
                "post_processing" : {
                    "bloom" : {
                        "strength" : 0.198,
                        "radius" : 1.966,
                        "threshold" : 0.054
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0xff4500,
                    "bottomColor": 0xffcc88,
                },

                "enviroments" : []
            },

            {
                "id" : "Gun_shop",
                "modelPath": "Models/Redrock/Gun_shop.glb", 
                "previewCamera" : {
                    "position": { "x": -1.60, "y": -1.14, "z": -27.28 },
                    "target": { "x": -6.09, "y": -1.06, "z": -27.26 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": -3.36, "y": 1.77, "z": 0.32 },
                    "target": { "x": -14.31, "y": -1.35, "z": 0.60 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [37.6, 8.4, -20],
                        "color" : '#f89d66',
                        "intensity" : 4.1
                    },

                    "ambient" : {
                        "color" : '#e65f33',
                        "intensity" : 0.639
                    }
                },
                
                "post_processing" : {
                    "bloom" : {
                        "strength" : 0.972,
                        "radius" : 1.042,
                        "threshold" : 0.521
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0xff4500,
                    "bottomColor": 0xffcc88,
                },

                "enviroments" : []
            },

            {
                "id" : "Bank",
                "modelPath": "Models/Redrock/Bank.glb", 
                "previewCamera" : {
                    "position": { "x": 0.80, "y": -0.35, "z": -46.22 },
                    "target": { "x": 9.64, "y": 0.04, "z": -46.22 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": 4.05, "y": 4.88, "z": -0.43 },
                    "target": { "x": 12.86, "y": 4.03, "z": -0.17 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [-31.2, 13.2, 3.2],
                        "color" : '#f89d66',
                        "intensity" : 3.24
                    },

                    "ambient" : {
                        "color" : '#e65f33',
                        "intensity" : 0.639
                    }
                },
                
                "post_processing" : {
                    "bloom" : {
                        "strength" : 0.123,
                        "radius" : 0.968,
                        "threshold" : 0.054
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0xff4500,
                    "bottomColor": 0xffcc88,
                },

                "enviroments" : []
            },

        ]
    },

   // ------------------------ WELLINGTON -------------------------------

   {   
        "id" : "Wellington",
        "modelPath": "Models/Wellington/Wellington.glb", 
        "camera": {
            "position": { "x": 18.38, "y": 0.40, "z": -0.13 },
            "target": { "x": 4.32, "y": -9.00, "z": -14.64 },
            "up": { "x": 0, "y": 1, "z": 0 }
        },

        "lights" : {
            "directional" : {
                "position" : [92, 52.4, 32.8],
                "color" : '#dbd276',
                "intensity" : 4.47
            },

            "ambient" : {
                "color" : '#827673',
                "intensity" : 3
            }
        },
        
        "post_processing" : {
            "bloom" : {
                "strength" : 0.087,
                "radius" : 1.214,
                "threshold" : 0.398
            }
        },

        "sky" : {
            "clouds" : false,
            "topColor": 0x0077ff,
            "bottomColor": 0xffffff,
        },

        "enviroments" : [
            {
                "id" : "Gun_shop",
                "modelPath": "Models/Wellington/Gun_shop.glb", 
                "previewCamera" : {
                    "position": { "x": 9.96, "y": -4.24, "z": -35.90 },
                    "target": { "x": 4.22, "y": -3.77, "z": -35.98 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": 5.71, "y": -0.11, "z": 4.24 },
                    "target": { "x": 2.29, "y": -1.72, "z": -1.59},
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [8.4, 23.2, 67.2],
                        "color" : '#dbd276',
                        "intensity" : 5.82
                    },

                    "ambient" : {
                        "color" : '#827673',
                        "intensity" : 0
                    }
                },
                
                "post_processing" : {
                    "bloom" : {
                        "strength" : 1.194,
                        "radius" : 0.5,
                        "threshold" : 0.914
                        
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x0077ff,
                    "bottomColor": 0xffffff,
                },

                "enviroments" : []
            },

            {
                "id" : "Bank",
                "modelPath": "Models/Wellington/Bank.glb", 
                "previewCamera" : {
                    "position": { "x": 6.34, "y": -3.27, "z": -12.23 },
                    "target": { "x": 1.07, "y": -3.26, "z": -17.37 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": 0.05, "y": 0.05, "z": 2.00 },
                    "target": { "x": -0.42, "y": -1.60, "z": -17.19 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [-16.4, -6.4, -13.2],
                        "color" : '#dbd276',
                        "intensity" : 5.82
                    },

                    "ambient" : {
                        "color" : '#827673',
                        "intensity" : 1.968
                    }
                },
                
                "post_processing" : {
                    "bloom" : {
                        "strength" : 0.75,
                        "radius" : 1.116,
                        "threshold" : 0.422
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x0077ff,
                    "bottomColor": 0xffffff,
                },

                "enviroments" : []
            },

            {
                "id" : "Hotel",
                "modelPath": "Models/Wellington/Hotel.glb", 
                "previewCamera" : {
                    "position": { "x": 6.69, "y": -3.17, "z": -4.07 },
                    "target": { "x": -3.40, "y": -3.75, "z": 2.46 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": 2.10, "y": 1.10, "z": -6.00 },
                    "target": { "x": -13.28, "y": -3.12, "z": 24.87 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [92, 3.2, -20],
                        "color" : '#dbd276',
                        "intensity" : 6.19
                    },

                    "ambient" : {
                        "color" : '#827673',
                        "intensity" : 0.381
                    }
                },
                
                "post_processing" : {
                    "bloom" : {
                        "strength" : 1.452,
                        "radius" : 0.5,
                        "threshold" : 0.705
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x0077ff,
                    "bottomColor": 0xffffff,
                },

                "enviroments" : []
            },

            {
                "id" : "Station",
                "modelPath": null, 
                "previewCamera" : {
                    "position": { "x": 11.57, "y": -3.46, "z": -34.41 },
                    "target": { "x": 11.50, "y": -3.46, "z": -43.26 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": null,
                "enviroments" : []          
            },  

            {
                "id" : "Jail",
                "modelPath": "Models/Wellington/Jail.glb", 
                "previewCamera" : {
                    "position": { "x": -16.25, "y": -3.38, "z": -9.03 },
                    "target": { "x": -16.16, "y": -3.66, "z": -18.44 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": -0.27, "y": 1.53, "z": -0.07 },
                    "target": { "x": -0.12, "y": -0.05, "z": -15.39 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [6.4, 77.2, -20],
                        "color" : '#dbd276',
                        "intensity" : 6.1
                    },

                    "ambient" : {
                        "color" : '#827673',
                        "intensity" : 2.04
                    }
                },
                
                "post_processing" : {
                    "bloom" : {
                        "strength" : 2.08,
                        "radius" : 0.71,
                        "threshold" : 0.4
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x0077ff,
                    "bottomColor": 0xffffff,
                },

                "enviroments" : []          
            },
        ]
    },
    // ----------------------- TERMINUS-------------------------------------

    {   
        "id" : "Terminus",
        "modelPath": "Models/Terminus/Terminus.glb", 
        "camera": {
            "position": { "x": 27.52, "y": -12.19, "z": -77.84 },
            "target": { "x": 24.15, "y": -24.43, "z": -21.19 },
            "up": { "x": 0, "y": 1, "z": 0 }
        },

        "lights" : {
            "directional" : {
                "position" : [-109.6, 23.2, -46],
                "color" : '#f89d66',
                "intensity" : 3.73
            },

            "ambient" : {
                "color" : '#e65f33',
                "intensity" : 0.3
            }
        },
        
        "post_processing" : {
            "bloom" : {
                "strength" : 0.0678,
                "radius" : 0.698,
                "threshold" : 0.422
            }
        },

        "sky" : {
            "clouds" : false,
            "topColor": 0x6699cc,
            "bottomColor": 0xffaa66,
        },

        "enviroments" : [
            {
                "id" : "Station",
                "modelPath": null, 
                "previewCamera" : {
                    "position": { "x": 27.73, "y": -15.74, "z": -42.49 },
                    "target": { "x": 27.79, "y": -16.41, "z": -35.05 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": null,
                "enviroments" : []
            },

            {
                "id" : "Hotel",
                "modelPath": "Models/Terminus/Hotel.glb", 
                "previewCamera" : {
                    "position": { "x": 30.23, "y": -15.27, "z": -40.05 },
                    "target": { "x": 59.18, "y": -16.03, "z": -46.32 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": 2.86, "y": 1.01, "z": -0.60 },
                    "target": { "x": 2.70, "y": 0.74, "z": 0.02 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [],
                        "color" : null,
                        "intensity" : null
                    },

                    "ambient" : {
                        "color" : null,
                        "intensity" : null
                    }
                },
                
                "post_processing" : {
                    "bloom" : {
                        "strength" : null,
                        "radius" : null,
                        "threshold" : null
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x6699cc,
                    "bottomColor": 0xffaa66,
                },

                "enviroments" : []
            },

            {
                "id" : "Saloon",
                "modelPath": "Models/Terminus/Saloon.glb", 
                "previewCamera" : {
                    "position": { "x": 25.03, "y": -16.87, "z": -52.55 },
                    "target": { "x": -7.97, "y": -21.68, "z": -51.52 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": -0.27, "y": 0.99, "z": 0.18 },
                    "target": { "x": -2.85, "y": 0.08, "z": -0.14 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [121.2, 23.2, 23.2],
                        "color" : '#f89d66',
                        "intensity" : 1.27
                    },

                    "ambient" : {
                        "color" : '#e65f33',
                        "intensity" : 0.3
                    }
                },
                
                "post_processing" : {
                    "bloom" : {
                        "strength" : 2.115,
                        "radius" : 0.918,
                        "threshold" : 0.103
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x6699cc,
                    "bottomColor": 0xffaa66,
                },

                "enviroments" : [
                    {
                        "id": "Bar",
                        "enviroments" : [],
                        "previewCamera": {
                            "position": { "x": -2.09, "y": 0.98, "z": 0.34 },
                            "target": { "x": -3.09, "y": 0.77, "z": 0.28 },
                            "up": { "x": 0, "y": 1, "z": 0 }
                        } 
                    }, 

                    {
                        "id": "Black_jack",
                        "enviroments" : [],
                        "previewCamera": {
                            "position": { "x": -0.27, "y": 0.92, "z": -0.09 },
                            "target": { "x": -2.20, "y": 0.18, "z": -1.30 },
                            "up": { "x": 0, "y": 1, "z": 0 }
                        }

                    },
                ]
            },

            {
                "id" : "Trading_post",
                "modelPath": "Models/Terminus/Trading_post.glb", 
                "previewCamera" : {
                    "position": { "x": 27.65, "y": -16.73, "z": -53.05 },
                    "target": { "x": 58.93, "y": -19.15, "z": -52.96 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": {
                    "position": { "x": 1.35, "y": 0.89, "z": -0.40 },
                    "target": { "x": 2.96, "y": 0.39, "z": -0.42 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "lights" : {
                    "directional" : {
                        "position" : [-200, 136, 72],
                        "color" : '#f89d66',
                        "intensity" : 2.87
                    },

                    "ambient" : {
                        "color" : '#e65f33',
                        "intensity" : '#e65f33'
                    }
                },
                
                "post_processing" : {
                    "bloom" : {
                        "strength" : null,
                        "radius" : null,
                        "threshold" : null
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": 0x6699cc,
                    "bottomColor": 0xffaa66,
                },

                "enviroments" : []
                    
            },
           
        ]
    },

    // ------------------------ COMANCHE TRIBE -------------------------------
    {   
        "id" : "Comanche_Tribe",
        "modelPath": "Models/Comanche_tribe/Comanche_tribe.glb", 
        "camera": {
            "position": { "x": 2.23, "y": 14.70, "z": 19.66 },
            "target": { "x": -2.48, "y": -8.27, "z": -8.26 },
            "up": { "x": 0, "y": 1, "z": 0 }
        },

        "lights" : {
                    "directional" : {
                        "position" : [],
                        "color" : null,
                        "intensity" : null
                    },

                    "ambient" : {
                        "color" : null,
                        "intensity" : null
                    }
                },
                
                "post_processing" : {
                    "bloom" : {
                        "strength" : null,
                        "radius" : null,
                        "threshold" : null
                    }
                },

                "sky" : {
                    "clouds" : false,
                    "topColor": null,
                    "bottomColor": null,
                },

        "enviroments" : [
            {
                "id" : "Tribe",
                "modelPath": null, 
                "previewCamera" : {
                    "position": { "x": -5.77, "y": 2.70, "z": -3.54 },
                    "target": { "x": -3.63, "y": -0.59, "z": -13.44 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": null,
                "enviroments" : []
            },
    
        ]
    },

    // ------------------------ QUERY -------------------------------
    {
        "id" : "Query",
        "modelPath": "Models/Query/Query.glb", 
        "camera": {
            "position": { "x": -13.11, "y": 6.28, "z": -19.58 },
            "target": { "x": 0.73, "y": -1.62, "z": -2.03 },
            "up": { "x": 0, "y": 1, "z": 0 }
        },

        "lights" : {
            "directional" : {
                "position" : [],
                "color" : null,
                "intensity" : null
            },

            "ambient" : {
                "color" : null,
                "intensity" : null
            }
        },
        
        "post_processing" : {
            "bloom" : {
                "strength" : null,
                "radius" : null,
                "threshold" : null
            }
        },

        "sky" : {
            "clouds" : false,
            "topColor": null,
            "bottomColor": null,
        },

        "enviroments" : [
            {
                "id" : "Mine",
                "modelPath": null, 
                "previewCamera" : {
                    "position": { "x": 4.52, "y": 0.56, "z": -4.46 },
                    "target": { "x": 7.04, "y": 0.01, "z": -4.29 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": null,
                "enviroments" : []
            },

            {
                "id" : "Station",
                "modelPath": null, 
                "previewCamera" : {
                    "position": { "x": -12.67, "y": 0.86, "z": -18.13 },
                    "target": { "x": 0.56, "y": -2.40, "z": -2.21 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": null,
                "enviroments" : []
            },

        ]
    },

     // ----------------------- THIEF CAMP -------------------------------
    {
        "id" : "Thief_Camp",
        "modelPath": "Models/Thief_camp/Thief_camp.glb", 
        "camera": {
            "position": { "x": 12.44, "y": 9.93, "z": -15.49},
            "target": { "x": 1.81, "y": -1.00, "z": -1.12 },
            "up": { "x": 0, "y": 1, "z": 0 }
        },

        "lights" : {
            "directional" : {
                "position" : [],
                "color" : null,
                "intensity" : null
            },

            "ambient" : {
                "color" : null,
                "intensity" : null
            }
        },
        
        "post_processing" : {
            "bloom" : {
                "strength" : null,
                "radius" : null,
                "threshold" : null
            }
        },

        "sky" : {
            "clouds" : false,
            "topColor": null,
            "bottomColor": null,
        },

        "enviroments" : [
            {
                "id" : "Camp",
                "modelPath": null, 
                "previewCamera" : {
                    "position": { "x": 0.18, "y": 0.97, "z": -7.56 },
                    "target": { "x": -1.02, "y": 0.77, "z": -7.75 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": null,
                "enviroments" : []
            },

        ]
    },

]