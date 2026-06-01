import { color } from "three/tsl";

export const scenarios_data = [
// ------------------------ VALENTINE-------------------------------
    {   
        "id" : "Valentine",
        "modelPath": "Models/Valentine/Valentine.glb", 
        "camera": { "position": { "x": -24.48, "y": 7.80, "z": 68.90 }, "target": { "x": -22.05, "y": -0.50, "z": 90.74 }, "up": { "x": 0, "y": 1, "z": 0 } },
        // Blender (X, Z, -Y)
        // Three.js (X, Y, Z)
        "npcs": [
            { "modelPath": "Models/Characters/Business_man/Business_man_01.glb", "name": "NPC_01", "position": [-30.61, 0.21, 86.35], "rotation": [0, 90, 0], "animationList" : ["Sit_idle"] },
            { "modelPath": "Models/Characters/Cowboy/Cowboy_01.glb", "name": "NPC_02", "position": [-26.59, 0, 93.04], "rotation": [0, 0, 0], "animationList" : ["Talk_01", "Talk_02", "Talk_03", "Talk_04"] },
            { "modelPath": "Models/Characters/Woman/Woman_01.glb", "name": "NPC_03", "position": [-25.87, 0.02, 94.7], "rotation": [0, 180, 0], "animationList" : ["Talk_01", "Talk_02", "Talk_03", "Talk_f_01"] },
            { "modelPath": "Models/Characters/Working_girl/Working_girl_01.glb", "name": "NPC_04", "position": [-27.24, 4.27, 110.49], "rotation": [0, 90, 0], "animationList" : ["Sit_talking_f"] },
            { "modelPath": "Models/Characters/Badguy/Badguy_03.glb", "name": "NPC_05", "position": [-28.59, 0.57, 112.43], "rotation": [0, 160, 0], "animationList" : ["Lean_foot"] },
            { "modelPath": "Models/Characters/Thug_man_02/Thug_man_02_01.glb", "name": "NPC_06", "position": [-13.72, 0.29, 80.5], "rotation": [0, 160, 0], "animationList" : ["Dealing"] },
            { "modelPath": "Models/Characters/Cowboy/Cowboy_02.glb", "name": "NPC_07", "position": [-14.99, 0.29, 100.64], "rotation": [0, 90, 0], "animationList" : ["Idle"] },
            { "modelPath": "Models/Characters/Salesman/Salesman_01.glb", "name": "NPC_08", "position": [-30.43, 3.30, 102.8], "rotation": [0, 180, 0], "animationList" : ["Lean_shoulder"] },
            // Animals
            { "modelPath": "Models/Horse/Horse_01.glb", "name": "HORSE_01", "position": [-8.12, 0.22, 75.06], "rotation": [0, 0, 0], "animationList" : ["Idle", "Eat"] },
            { "modelPath": "Models/Horse/Horse_01.glb", "name": "HORSE_02", "position": [-12.79, 0.22, 75.94], "rotation": [0, -30, 0], "animationList" : ["Idle", "Eat"] },
            { "modelPath": "Models/Horse/Horse_02.glb", "name": "HORSE_03", "position": [-11.80, 0.22, 80.46], "rotation": [0, 30, 0], "animationList" : ["Idle", "Eat"] },
            { "modelPath": "Models/Horse/Horse_03.glb", "name": "HORSE_04", "position": [-10.22, 0.22, 80.57], "rotation": [0, 20, 0], "animationList" : ["Idle", "Eat"] },
            { "modelPath": "Models/Horse/Horse_04.glb", "name": "HORSE_05", "position": [-21.17, 0.16, 115.37], "rotation": [0, -90, 0], "animationList" : ["Idle"] },
            { "modelPath": "Models/Horse/Horse_05.glb", "name": "HORSE_06", "position": [-21.71, 0.16, 111.42], "rotation": [0, -90, 0], "animationList" : ["Idle"] },
            { "modelPath": "Models/Horse/Horse_01.glb", "name": "HORSE_07", "position": [-13.06, 0.29, 109.56], "rotation": [0, 90, 0], "animationList" : ["Idle"] },

        ],
        
        "lights" : {
            "directional" : { "position" : [32.8, 42.8, 3.2], "color" : '#ead380', "intensity" : 4 },
            "ambient" : { "color" : '#71a2a2', "intensity" : 1.305 }
        },
        "post_processing" : {
            "bloom" : { "strength" : 0.087, "radius" : 1.238, "threshold" : 0.263 }
        },

        "sky" : { "clouds" : false, "topColor": 0x0077ff, "bottomColor": 0xffffff },

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

                "npcs": [
                    { "modelPath": "Models/Characters/Thug_man/Thug_man_01.glb", "name": "NPC_01", "position": [-0.45, -0.84, -0.50], "rotation": [0, 30, 0], "animationList" : ["Dealing"] },
                    { "modelPath": "Models/Characters/Business_man/Business_man_01.glb", "name": "BARMAN", "position": [3.34, -0.84, -2.77], "rotation": [0, -15, 0], "animationList" : ["Idle"] },
                    { "modelPath": "Models/Characters/Working_girl/Working_girl_02.glb", "name": "NPC_02", "position": [-0.53, 2.07, -2.69], "rotation": [0, 30, 0], "animationList" : ["Talk_f_01", "Talk_01", "Talk_02", "Talk_03"] },
                    { "modelPath": "Models/Characters/Working_girl/Working_girl_03.glb", "name": "NPC_03", "position": [0.52, 2.07, -2.43], "rotation": [0, 200, 0], "animationList" : ["Talk_f_01", "Talk_01", "Talk_02", "Talk_03"] },
                    { "modelPath": "Models/Characters/Business_man/Business_man_02.glb", "name": "NPC_04", "position": [-2.57, -0.82, 1.98], "rotation": [0, -90, 0], "animationList" : ["Piano"] },
                    { "modelPath": "Models/Characters/Sheriff/Sheriff_01.glb", "name": "NPC_05", "position": [1.39, -0.82, 2.03], "rotation": [0, 30, 0], "animationList" : ["Sit_idle", "Sit_talking", "Sit_talking_02", "Sit_victory"] },
                    { "modelPath": "Models/Characters/Gunman/Gunman_01.glb", "name": "NPC_06", "position": [2.05, -0.82, 4.04], "rotation": [0, -180, 0], "animationList" : ["Sit_idle", "Sit_talking", "Sit_talking_02", "Sit_victory"] },
                    { "modelPath": "Models/Characters/Bandit_man/Bandit_man_01.glb", "name": "NPC_06", "position": [3.40, -0.82, 1.21], "rotation": [0, -200, 0], "animationList" : ["Sit_idle", "Sit_talking", "Sit_talking_02", "Sit_victory"] },
                    { "modelPath": "Models/Characters/Thug_man/Thug_man_02.glb", "name": "NPC_06", "position": [4.77, -0.82, 0.78], "rotation": [0, -100, 0], "animationList" : ["Sit_idle", "Sit_talking", "Sit_talking_02", "Sit_victory"] },
                    { "modelPath": "Models/Characters/Badguy/Badguy_02.glb", "name": "NPC_06", "position": [6.56, -0.84, 1.58], "rotation": [0, -100, 0], "animationList" : ["Lean_shoulder"] },
                ],

                "lights" : {
                    "directional" : { "position" : [77.2, 32.8, 3.2], "color" : '#ecbfbb', "intensity" : 4.35 },

                    "ambient" : { "color" : '#9e8670', "intensity" : 0.897 }
                },
                "post_processing" : {
                    "bloom" : { "strength" : 0.27, "radius" : 0.82, "threshold" : 0.422 }
                },

                "sky" : { "clouds" : false, "topColor": 0x0077ff, "bottomColor": 0xffffff},

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

                "npcs" : [
                    { "modelPath": "Models/Characters/Cowgirl/Cowgirl_01.glb", "name": "SALESMAN", "position": [-6.94, 0.02, 88.69], "rotation": [0, -120, 0], "animationList" : ["Idle"] },
                    { "modelPath": "Models/Horse/Horse_01.glb", "name": "HORSE_01", "position": [-6.94, 0.03, 91.00], "rotation": [0, 180, 0], "animationList" : ["Idle"] },
                    { "modelPath": "Models/Horse/Horse_05.glb", "name": "HORSE_02", "position": [-7.99, 0.03, 91.06], "rotation": [0, 180, 0], "animationList" : ["Idle"] },
                ],

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

                "npcs" : [
                    { "modelPath": "Models/Characters/Salesman/Salesman_01.glb", "name": "SALESMAN", "position": [14.30, -3.10, 0.66], "rotation": [0, -90, 0], "animationList" : ["Idle"] },
                ],

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

                "npcs" : [
                    { "modelPath": "Models/Characters/Salesman/Salesman_02.glb", "name": "RECEPCIONIST", "position": [0.93, -1.01, -2.09], "rotation": [0, 90, 0], "animationList" : ["Idle"] },
                ],

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

                "npcs" : [
                    { "modelPath": "Models/Characters/Sheriff/Sheriff_02.glb", "name": "SHERIFF", "position": [-5.29, -1.56, 0.40], "rotation": [0, -90, 0], "animationList" : ["Sit_idle"] },
                ],

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

                "npcs" : [
                    { "modelPath": "Models/Characters/Thug_man_02/Thug_man_02_02.glb", "name": "SALESMAN", "position": [-5.55, 0.62, 103.21], "rotation": [0, -90, 0], "animationList" : ["Idle"] },
                ],

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

        "npcs": [
            { "modelPath": "Models/Characters/Mexican_girl/Mexican_girl_01.glb", "name": "NPC_01", "position": [-9.40, -3.40, -8.16], "rotation": [0, 30, 0], "animationList" : ["Sit_idle"] },
            { "modelPath": "Models/Characters/Mexican_02/Mexican_02_01.glb", "name": "NPC_02", "position": [4.47, -3.56, -12.94], "rotation": [0, -60, 0], "animationList" : ["Lean_foot"] },
            { "modelPath": "Models/Horse/Horse_03.glb", "name": "HORSE_01", "position": [4.58, -3.20, -3.19], "rotation": [0, -60, 0], "animationList" : ["Idle", "Eat"] }, 
        ],


        "lights" : {
            "directional" : { "position" : [-200, 32.6, 200], "color" : '#f5a614', "intensity" : 4.1 },

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

                "npcs": [
                    { "modelPath": "Models/Characters/Mexican_01/Mexican_02.glb", "name": "NPC_01", "position": [-1.70, 0.57, 0.38], "rotation": [0, 30, 0], "animationList" : ["Dealing"] },
                    { "modelPath": "Models/Characters/Mexican_01/Mexican_01.glb", "name": "NPC_02", "position": [1.44, 0.57, 0.05], "rotation": [0, -60, 0], "animationList" : ["Sit_idle", "Sit_talking"] },
                    { "modelPath": "Models/Characters/Mexican_02/Mexican_02_02.glb", "name": "BARMAN", "position": [0.31, 0.57, -3.38], "rotation": [0, 0, 0], "animationList" : ["Idle"] }, 
                ],

                "lights" : { 
                    "directional" : { "position" : [-1.6, -50.8, 32.8], "color" : '#f5a614', "intensity" : 10 },

                    "ambient" : { "color" : '#bda461', "intensity" : 1.968 }
                },
                "post_processing" : {
                    "bloom" : { "strength" : 0.603, "radius" : 1.188, "threshold" : 0.484 }
                },

                "sky" : { "clouds" : false, "topColor": 0x6699cc, "bottomColor": 0xffaa66 },

                "enviroments" : [
                    {
                        "id": "Bar",
                        "enviroments" : [],
                        "previewCamera": { "position": { "x": 0.48, "y": 1.91, "z": -1.61 }, "target": { "x": 0.47, "y": 1.76, "z": -2.18 }, "up": { "x": 0, "y": 1, "z": 0 } } 
                    }, 

                    {
                        "id": "Black_jack",
                        "enviroments" : [],
                        "previewCamera": { "position": { "x": -0.70, "y": 1.97, "z": 2.72 }, "target": { "x": -0.79, "y": 0.66, "z": 0.52 }, "up": { "x": 0, "y": 1, "z": 0 } }
                    },
                ]
            },

            {
                "id" : "Gun_shop",
                "modelPath": "Models/Armadillo/Gun_shop.glb", 
                "previewCamera" : { "position": { "x": 0.72, "y": -0.68, "z": -14.27 }, "target": { "x": 18.89, "y": -2.32, "z": -14.00 }, "up": { "x": 0, "y": 1, "z": 0 }},
                "camera": { "position": { "x": 0.36, "y": 1.80, "z": -1.08 }, "target": { "x": 10.18, "y": -3.57, "z": 12.26 }, "up": { "x": 0, "y": 1, "z": 0 } },

                "npcs": [
                    { "modelPath": "Models/Characters/Mexican_02/Mexican_02_01.glb", "name": "NPC_01", "position": [2.10, 0.43, 2.36], "rotation": [0, 200, 0], "animationList" : ["Idle"] },
                ],

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

                "npcs": [
                    { "modelPath": "Models/Characters/Mexican_girl/Mexican_girl_01.glb", "name": "NPC_01", "position": [2.93, 0.43, 2.71], "rotation": [0, 230, 0], "animationList" : ["Idle"] },
                ],

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
        "camera": { "position": { "x": 0.30, "y": 1.13, "z": -12.36}, "target": { "x": 0.20, "y": 0.00, "z": -16.17 }, "up": { "x": 0, "y": 1, "z": 0 } },

        "npcs": [
            { "modelPath": "Models/Characters/Badguy/Badguy_01.glb", "name": "NPC_01", "position": [-4.12, -3.43, -25.02], "rotation": [0, 0, 0], "animationList" : ["Lean_shoulder"] },
            { "modelPath": "Models/Characters/Woman/Woman_02.glb", "name": "NPC_02", "position": [-4.10, -3.43, -37.51], "rotation": [0, -60, 0], "animationList" : ["Idle"] },
            { "modelPath": "Models/Characters/Cowboy/Cowboy_03.glb", "name": "NPC_03", "position": [6.72, -3.43, -43.57], "rotation": [0, 0, 0], "animationList" : ["Lean_foot"] },
            { "modelPath": "Models/Characters/Cowgirl/Cowgirl_02.glb", "name": "NPC_04", "position": [6.78, -3.04, -21.42], "rotation": [0, -120, 0], "animationList" : ["Sit_idle"] },
            // Animals
            { "modelPath": "Models/Horse/Horse_01.glb", "name": "HORSE_01", "position": [13.68, -3.49, -24.59], "rotation": [0, -90, 0], "animationList" : ["Idle", "Eat"] },
            { "modelPath": "Models/Horse/Horse_02.glb", "name": "HORSE_02", "position": [19.05, -3.49, -24.04], "rotation": [0, 120, 0], "animationList" : ["Idle", "Eat"] },
            { "modelPath": "Models/Horse/Horse_02.glb", "name": "HORSE_03", "position": [19.62, -3.49, -18.52], "rotation": [0, -30, 0], "animationList" : ["Idle", "Eat"] },
            { "modelPath": "Models/Horse/Horse_05.glb", "name": "HORSE_04", "position": [3.45, -3.26, -29.03], "rotation": [0, 90, 0], "animationList" : ["Idle"] },
        ],

        "lights" : {
            "directional" : { "position" : [77.2, 23.2, 32.8], "color" : '#f89d66', "intensity" : 2.5 },
            "ambient" : { "color" : '#e65f33', "intensity" : 1.413 }
        },

        "post_processing" : {
            "bloom" : { "strength" : 0.492, "radius" : 0.992, "threshold" : 0.496 }
        },

        "sky" : { "clouds" : false, "topColor": 0xff4500, "bottomColor": 0xffcc88, },

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

                "npcs": [
                    { "modelPath": "Models/Characters/Thug_man_02/Thug_man_02_01.glb", "name": "NPC_01", "position": [-5.98, 0.57, 101.74], "rotation": [0, -120, 0], "animationList" : ["Idle"] },
                ],

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

                "npcs": [
                    { "modelPath": "Models/Characters/Sheriff/Sheriff_03.glb", "name": "NPC_01", "position": [-5.37, -1.53, 0.47], "rotation": [0, -90, 0], "animationList" : ["Sit_idle"] },
                ],

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

                "npcs": [
                    { "modelPath": "Models/Characters/Gunman/Gunman_02.glb", "name": "NPC_01", "position": [-6.38, 0.0, 1.01], "rotation": [0, 90, 0], "animationList" : ["Idle"] },

                ],

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

                "npcs": [
                    { "modelPath": "Models/Characters/Salesman/Salesman_02.glb", "name": "NPC_01", "position": [6.84, 2.96, -0.78], "rotation": [0, -90, 0], "animationList" : ["Idle"] },
                ],

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
            "position": { "x": 21.23, "y": 2.31, "z": 2.81 },
            "target": { "x": 4.32, "y": -9.00, "z": -14.64 },
            "up": { "x": 0, "y": 1, "z": 0 }
        },

        "npcs": [
            { "modelPath": "Models/Characters/Salesman/Salesman_02.glb", "name": "NPC_01", "position": [4.29, -7.37, -11.67], "rotation": [0, 30, 0], "animationList" : ["Talk_01", "Talk_02", "Talk_03", "Talk_04"] },
            { "modelPath": "Models/Characters/Salesman/Salesman_01.glb", "name": "NPC_02", "position": [4.55, -7.37, -10.05], "rotation": [0, 120, 0], "animationList" : ["Talk_01", "Talk_02", "Talk_03", "Talk_04"] },
            { "modelPath": "Models/Characters/Business_man/Business_man_03.glb", "name": "NPC_03", "position": [5.70, -7.37, -11.33], "rotation": [0, -90, 0], "animationList" : ["Talk_01", "Talk_02", "Talk_03", "Talk_04"] },
            { "modelPath": "Models/Characters/Woman/Woman_01.glb", "name": "NPC_04", "position": [17.85, -7.37, -9.89], "rotation": [0, 0, 0], "animationList" : ["Talk_01", "Talk_02", "Talk_03", "Talk_f_01"] },
            { "modelPath": "Models/Characters/Salesman/Salesman_03.glb", "name": "NPC_05", "position": [19.15, -7.37, -8.94], "rotation": [0, -120, 0], "animationList" : ["Talk_01", "Talk_02", "Talk_03", "Talk_04"] },
            { "modelPath": "Models/Characters/Salesman/Salesman_02.glb", "name": "NPC_07", "position": [3.63, -3.52, -19.31], "rotation": [0, 30, 0], "animationList" : ["Idle"] },
            { "modelPath": "Models/Characters/Business_man/Business_man_02.glb", "name": "NPC_06", "position": [18.09, -6.92, -19.27], "rotation": [0, -60, 0], "animationList" : ["Sit_idle"] },
            { "modelPath": "Models/Characters/Cowboy/Cowboy_03.glb", "name": "NPC_08", "position": [0.14, -3.52, -2.30], "rotation": [0, -90, 0], "animationList" : ["Lean_shoulder"] },
            { "modelPath": "Models/Characters/Business_man/Business_man_03.glb", "name": "NPC_09", "position": [11.85, -7.23, -40.73], "rotation": [0, 0, 0], "animationList" : ["Sit_idle"] },
            // Animals
            { "modelPath": "Models/Horse/Horse_01.glb", "name": "HORSE_01", "position": [-3.74, -7.37, -12.39], "rotation": [0, 180, 0], "animationList" : ["Idle"] },
            { "modelPath": "Models/Horse/Horse_03.glb", "name": "HORSE_02", "position": [8.76, -7.37, -20.08], "rotation": [0, 0, 0], "animationList" : ["Idle", "Eat"] },
            { "modelPath": "Models/Horse/Horse_02.glb", "name": "HORSE_03", "position": [7.75, -7.37, -20.11], "rotation": [0, 0, 0], "animationList" : ["Idle", "Eat"] },
        ],

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

                "npcs": [
                    { "modelPath": "Models/Characters/Business_man/Business_man_03.glb", "name": "SALESMAN", "position": [4.28, -1.98, 0.99], "rotation": [0, 30, 0], "animationList" : ["Idle"] },
                ],

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

                "npcs": [
                    { "modelPath": "Models/Characters/Salesman/Salesman_04.glb", "name": "SALESMAN", "position": [-0.25, -1.77, -1.32], "rotation": [0, 0, 0], "animationList" : ["Idle"] },
                ],

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

                "npcs": [
                    { "modelPath": "Models/Characters/Business_man/Business_man_02.glb", "name": "RECEPCIONIST", "position": [-1.04, -0.30, -5.49], "rotation": [0, 100, 0], "animationList" : ["Idle"] },
                ],

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

                "npcs": [
                    { "modelPath": "Models/Characters/Sheriff/Sheriff_01.glb", "name": "SHERIFF", "position": [-0.28, -0.01, -3.70], "rotation": [0, 0, 0], "animationList" : ["Idle"] },
                    { "modelPath": "Models/Characters/Bandit_man/Bandit_man_01.glb", "name": "NPC_01", "position": [-3.93, 0.10, -5.45], "rotation": [0, 0, 0], "animationList" : ["Sit_idle"] },
                ],

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

        "npcs": [
            { "modelPath": "Models/Characters/Cowboy/Cowboy_04.glb", "name": "NPC_01", "position": [33.13, -19.34, -58.34], "rotation": [0, -30, 0], "animationList" : ["Sit_idle", "Sit_talking", "Sit_talking_02"] },
            { "modelPath": "Models/Characters/Thug_man_02/Thug_man_02_03.glb", "name": "NPC_02", "position": [33.45, -19.25, -56.52], "rotation": [0, 270, 0], "animationList" : ["Sit_idle", "Sit_talking", "Sit_talking_02"] },
            { "modelPath": "Models/Characters/Business_man/Business_man_03.glb", "name": "NPC_03", "position": [34.85, -15.97, -46.94], "rotation": [0, 270, 0], "animationList" : ["Idle"] },
            { "modelPath": "Models/Characters/Badguy/Badguy_02.glb", "name": "NPC_04", "position": [20.99, -19.41, -54.12], "rotation": [0, -270, 0], "animationList" : ["Lean_foot"] },
            { "modelPath": "Models/Characters/Business_man/Business_man_01.glb", "name": "NPC_05", "position": [22.23, -18.27, -33.50], "rotation": [0, 270, 0], "animationList" : ["Sit_idle"] },
            { "modelPath": "Models/Characters/Woman/Woman_02.glb", "name": "NPC_06", "position": [18.77, -18.27, -33.79], "rotation": [0, 270, 0], "animationList" : ["Sit_talking_f"] },
        ],

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
                    "position": { "x": 5.92, "y": 1.51, "z": -1.83 },
                    "target": { "x": 5.57, "y": 0.77, "z": 0.91 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "npcs": [
                    { "modelPath": "Models/Characters/Business_man/Business_man_03.glb", "name": "RECEPCIONIST", "position": [6.14, -0.02, 1.34], "rotation": [0, 180, 0], "animationList" : ["Idle"] },
                ],

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
                    "position": { "x": -0.55, "y": 1.68, "z": 0.20 },
                    "target": { "x": -3.09, "y": 0.66, "z": -0.12 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "npcs": [
                    { "modelPath": "Models/Characters/Thug_man_02/Thug_man_02_02.glb", "name": "BARMAN", "position": [-6.78, -0.02, 1.26], "rotation": [0, 90, 0], "animationList" : ["Idle"] },
                    { "modelPath": "Models/Characters/Badguy/Badguy_03.glb", "name": "NPC_01", "position": [-2.06, 0.14, 1.15], "rotation": [0, -90, 0], "animationList" : ["Sit_idle", "Sit_talking"] },
                    { "modelPath": "Models/Characters/Thug_man/Thug_man_03.glb", "name": "NPC_02", "position": [-3.20, -0.02, -0.80], "rotation": [0, 130, 0], "animationList" : ["Dealing"] },
                ],

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
                    "position": { "x": 3.11, "y": 1.63, "z": -0.96 },
                    "target": { "x": 3.33, "y": 1.57, "z": -0.94 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },

                "npcs": [
                    { "modelPath": "Models/Characters/Gunman/Gunman_01.glb", "name": "SELLER", "position": [5.73, -0.04, -1.02], "rotation": [0, -90, 0], "animationList" : ["Idle"] },
                ],

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
            "position": { "x": 8.44, "y": 12.67, "z": 28.69 },
            "target": { "x": -2.48, "y": -6.27, "z": -8.26 },
            "up": { "x": 0, "y": 1, "z": 0 }
        },

        "npcs": [
            { "modelPath": "Models/Characters/Native_chief/Native_chief_01.glb", "name": "CHIEF", "position": [-7.04, 1.07, -15.26], "rotation": [0, -30, 0], "animationList" : ["Idle"] },
            { "modelPath": "Models/Characters/Native_girl/Native_girl_01.glb", "name": "NPC_01", "position": [-7.16, 1.07, -4.57], "rotation": [0, -30, 0], "animationList" : ["Dealing"] },
            { "modelPath": "Models/Characters/Native_man/Native_man_01.glb", "name": "NPC_02", "position": [-2.48, 1.76, -0.56], "rotation": [0, 90, 0], "animationList" : ["Sit_talking"] },
            { "modelPath": "Models/Characters/Native_man_02/Native_man_02.glb", "name": "NPC_03", "position": [5.0, -1.36, 4.99], "rotation": [0, 90, 0], "animationList" : ["Talk_01", "Talk_02", "Talk_03", "Talk_04"] },
            { "modelPath": "Models/Characters/Native_man/Native_man_01.glb", "name": "NPC_04", "position": [6.16, -1.14, 4.86], "rotation": [0, -90, 0], "animationList" : ["Talk_01", "Talk_02", "Talk_03", "Talk_04"] },
            // Animals
            { "modelPath": "Models/Horse/Horse_03.glb", "name": "HORSE_01", "position": [3.97, -1.54, 18.48], "rotation": [0, -100, 0], "animationList" : ["Idle", "Eat"] },
            { "modelPath": "Models/Horse/Horse_04.glb", "name": "HORSE_02", "position": [38.64, -5.68, -5.74], "rotation": [0, 100, 0], "animationList" : ["Idle", "Eat"] },
        ],

        "lights" : {
            "directional" : { "position" : [-11.6, 18, -16.4], "color" : '#ffd27f', "intensity" : 4.71 },
            "ambient" : { "color" : '#d7c96a', "intensity" : 1.12 }
        },
                
        "post_processing" : {
            "bloom" : { "strength" : 0.123, "radius" : 1.116, "threshold" : 0.299 }
        },

        "sky" : {
            "clouds" : false,
            "topColor": 0x0077ff, 
            "bottomColor": 0xffffff
        },

        "enviroments" : [
            {
                "id" : "Tribe",
                "modelPath": null, 
                "previewCamera" : {
                    "position": { "x": -9.89, "y": 3.22, "z": -12.89 },
                    "target": { "x": -6.48, "y": 2.58, "z": -17.89 },
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
            "position": { "x": 28.77, "y": 24.00, "z": -29.06},
            "target": { "x": 8.15, "y": -3.04, "z": 2.05 },
            "up": { "x": 0, "y": 1, "z": 0 }
        },

        "npcs": [
            { "modelPath": "Models/Characters/Bandit_man/Bandit_man_02.glb", "name": "NPC_01", "position": [6.47, 0.33, -16.48], "rotation": [0, -30, 0], "animationList" : ["Sit_talking", "Sit_talking_02", "Sit_victory"] },
            { "modelPath": "Models/Characters/Badguy/Badguy_02.glb", "name": "NPC_02", "position": [4.40, 0.33, -17.04], "rotation": [0, 30, 0], "animationList" : ["Sit_talking", "Sit_talking_02", "Sit_victory"] },
            { "modelPath": "Models/Characters/Bandit_man/Bandit_man_01.glb", "name": "SELLER", "position": [-2.10, 0.21, -14.29], "rotation": [0, 120, 0], "animationList" : ["Sit_idle"] },
            // Animals
            { "modelPath": "Models/Horse/Horse_01.glb", "name": "HORSE_01", "position": [3.97, 0.15, -7.33], "rotation": [0, -90, 0], "animationList" : ["Idle", "Eat"] },
            { "modelPath": "Models/Horse/Horse_05.glb", "name": "HORSE_02", "position": [4.12, 0.15, -6.11], "rotation": [0, -90, 0], "animationList" : ["Idle", "Eat"] },
        ],

        "lights" : {
            "directional" : { "position" : [37.6, -40.8, -100], "color" : "#f9ebc3", "intensity" : 2.13 },

            "ambient" : {
                "color" : "#aec7ad",
                "intensity" :  0.528
            }
        },
        
        "post_processing" : {
            "bloom" : {
                "strength" : 0.381,
                "radius" : 0.034,
                "threshold" : 0.275
            }
        },

        "sky" : {
            "clouds" : false,
            "topColor": 0x0077ff, 
            "bottomColor": 0xffffff
        },

        "enviroments" : [
            {
                "id" : "Camp",
                "modelPath": null, 
                "previewCamera" : {
                    "position": { "x": 0.45, "y": 1.77, "z": -15.77 },
                    "target": { "x": -9.64, "y": -0.94, "z": -17.81 },
                    "up": { "x": 0, "y": 1, "z": 0 }
                },
                "camera": null,
                "enviroments" : []
            },

        ]
    },

]