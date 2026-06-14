export const items_data = [
   //═══════════════════ WEAPONS ════════════════════════════════════ 
   {
    "id": 1,
    "name": "Old Pistol",
    "type": "weapon",
    "description": "A worn but reliable sidearm.",
    "value": 0,
    "max_stack": 1,
    "lose": false,
    "drawing": "drawings/items/weapons/Old_pistol_drawing.png",
    "icon": "items/weapons/Old_pistol.png",
    "rarity": 1,
    "upgrade_cost": [100, 200],
    "stats": {
      "damage": [10, 20, 30],
      "ammo_type": 1,
      "ammo_capacity": 6
    }
  },

  {
    "id": 2,
    "name": "Inquisitor",
    "type": "weapon",
    "description": "A great Jack of all trades.",
    "value": 100,
    "max_stack": 1,
    "lose": true,
    "drawing": "drawings/items/weapons/Inquisitor_drawing.png",
    "icon": "items/weapons/Inquisitor.png",
    "rarity": 2,
    "upgrade_cost": [300, 650],
    "stats": {
      "damage": [15, 30, 45],
      "ammo_type": 1,
      "ammo_capacity": 6
    }
  },

  {
    "id": 3,
    "name": "Pacificador",
    "type": "weapon",
    "description": "Big iron on his hip",
    "value": 500,
    "max_stack": 1,
    "lose": true,
    "drawing": "drawings/items/weapons/Pacificador_drawing.png",
    "icon": "items/weapons/Pacificador.png",
    "rarity": 4,
    "upgrade_cost": [700, 1500],
    "stats": {
      "damage": [30, 60, 90],
      "ammo_type": 1,
      "ammo_capacity": 6
    }
  },

  {
    "id": 4,
    "name": "Sawed Off",
    "type": "weapon",
    "description": "",
    "value": 250,
    "max_stack": 1,
    "lose": true,
    "drawing": "drawings/items/weapons/Sawed_off_drawing.png",
    "icon": "items/weapons/Sawed_off.png",
    "rarity": 2,
    "upgrade_cost": [200, 5],
    "stats": {
      "damage": [20, 45, 70],
      "ammo_type": 2,
      "ammo_capacity": 2
    }
  },

  {
    "id": 5,
    "name": "Double Barrel",
    "type": "weapon",
    "description": "",
    "value": 1000,
    "max_stack": 1,
    "lose": true,
    "drawing": "drawings/items/weapons/Double_barrel_drawing.png",
    "icon": "items/weapons/Double_barrel.png",
    "rarity": 3,
    "upgrade_cost": [1500, 3000],
    "stats": {
      "damage": [50, 80, 120],
      "ammo_type": 2,
      "ammo_capacity": 2
    }
  },

  {
    "id": 6,
    "name": "Winchester",
    "type": "weapon",
    "description": "",
    "value": 1500,
    "max_stack": 1,
    "lose": true,
    "drawing": "drawings/items/weapons/Winchester_drawing.png",
    "icon": "items/weapons/Winchester.png",
    "rarity": 4,
    "upgrade_cost": [2000, 3000],
    "stats": {
      "damage": [70, 100, 150],
      "ammo_type": 3,
      "ammo_capacity": 7
    }
  },

  {
    "id": 7,
    "name": "Huntsman Rifle",
    "type": "weapon",
    "description": "",
    "value": 1500,
    "max_stack": 1,
    "lose": true,
    "drawing": "drawings/items/weapons/Huntsman_rifle_drawing.png",
    "icon": "items/weapons/Huntsman_rifle.png",
    "rarity": 4,
    "upgrade_cost": [2500, 4000],
    "stats": {
      "damage": [100, 150, 200],
      "ammo_type": 3,
      "ammo_capacity": 7
    }
  },
  //═══════════════════ TRINKETS ════════════════════════════════════ 

  {
    "id": 8,
    "name": "Diamond",
    "type": "trinket",
    "value": 2000,
    "max_stack": 1,
    "lose": true,
    "icon": "items/trinkets/Diamond.png",
    "rarity": 5,
  },

  {
    "id": 9,
    "name": "Gold Bar",
    "type": "trinket",
    "value": 1000,
    "max_stack": 5,
    "lose": true,
    "icon": "items/trinkets/Gold_bar.png",
    "rarity": 4,
  },

  {
    "id": 10,
    "name": "Gold Nugget",
    "type": "trinket",
    "value": 350,
    "max_stack": 10,
    "lose": true,
    "icon": "items/trinkets/Gold_nugget.png",
    "rarity": 2,
  },

  {
    "id": 11,
    "name": "Pearl Necklace",
    "type": "trinket",
    "value": 1500,
    "max_stack": 3,
    "lose": true,
    "icon": "items/trinkets/Pearl_necklace.png",
    "rarity": 4,
  },

  {
    "id": 12,
    "name": "Ring",
    "type": "trinket",
    "value": 800,
    "max_stack": 5,
    "lose": true,
    "icon": "items/trinkets/Ring.png",
    "rarity": 3,
  },

  //═══════════════════ Consumables ════════════════════════════════════ 

   {
    "id": 13,
    "name": "Beer",
    "type": "consumable",
    "description": "Gives you a bit of strength for a short time",
    "value": 10,
    "max_stack": 1,
    "lose": true,
    "drawing": "drawings/items/consumables/Beer_drawing.png",
    "icon": "items/consumables/Beer.png",
    "rarity": 1,
    "stats": {
      "strength": 5,
      "energy": 0,
      "xp": 0,
      "effect": 1
    }
  },

  {
    "id": 14,
    "name": "Whisky",
    "type": "consumable",
    "description": "Grants you strength for a considerable amount of time",
    "value": 15,
    "max_stack": 1,
    "lose": true,
    "drawing": "drawings/items/consumables/Whisky_drawing.png",
    "icon": "items/consumables/Whisky.png",
    "rarity": 1,
    "stats": {
      "strength": 10,
      "energy": 0,
      "xp": 0,
      "effect": 2
    }
  },

  {
    "id": 15,
    "name": "Moonshine",
    "type": "consumable",
    "description": "Makes you drunk and insane",
    "value": 20,
    "max_stack": 1,
    "lose": true,
    "drawing": "drawings/items/consumables/Moonshine_drawing.png",
    "icon": "items/consumables/Moonshine.png",
    "rarity": 1,
    "stats": {
      "strength": 50,
      "energy": 0,
      "xp": -10,
      "effect": 0.5
    }
  },

  {
    "id": 16,
    "name": "Bread",
    "type": "consumable",
    "description": "Restores a large amount of energy",
    "value": 10,
    "max_stack": 5,
    "lose": true,
    "drawing": "drawings/items/consumables/Bread_drawing.png",
    "icon": "items/consumables/Bread.png",
    "rarity": 1,
    "stats": {
      "strength": 0,
      "energy": 50,
      "xp": 0,
      
    }
  },

  {
    "id": 17,
    "name": "Carrot",
    "type": "consumable",
    "description": "Restores some energy",
    "value": 5,
    "max_stack": 5,
    "lose": true,
    "drawing": "drawings/items/consumables/Carrot_drawing.png",
    "icon": "items/consumables/Carrot.png",
    "rarity": 1,
    "stats": {
      "strength": 0,
      "energy": 25,
      "xp": 0,
      
    }
  },

  {
    "id": 18,
    "name": "Fish",
    "type": "consumable",
    "description": "Restores energy and gives a bit of experience",
    "value": 15,
    "max_stack": 5,
    "lose": true,
    "drawing": "drawings/items/consumables/Fish_drawing.png",
    "icon": "items/consumables/Fish.png",
    "rarity": 1,
    "stats": {
      "strength": 0,
      "energy": 20,
      "xp": 5,
      
    }
  },

  {
    "id": 19,
    "name": "Meat",
    "type": "consumable",
    "description": "Gives you a bit of everything",
    "value": 25,
    "max_stack": 3,
    "lose": true,
    "drawing": "drawings/items/consumables/Meat_drawing.png",
    "icon": "items/consumables/Meat.png",
    "rarity": 1,
    "stats": {
      "strength": 10,
      "energy": 15,
      "xp": 5,
      
    }
  },

  {
    "id": 20,
    "name": "Tomato",
    "type": "consumable",
    "description": "Gives you a bit of energy",
    "value": 15,
    "max_stack": 10,
    "lose": true,
    "drawing": "drawings/items/consumables/Tomato_drawing.png",
    "icon": "items/consumables/Tomato.png",
    "rarity": 1,
    "stats": {
      "strength": 0,
      "energy": 10,
      "xp": 0,
      
    }
  },

  {
    "id": 21,
    "name": "Shovel",
    "type": "consumable",
    "description": "Helps a bit while mining",
    "value": 50,
    "max_stack": 1,
    "lose": true,
    "drawing": "drawings/items/consumables/Shovel_drawing.png",
    "icon": "items/consumables/Shovel.png",
    "rarity": 1,
    "stats": {
      "mining_stats": 10
      
    }
  },

  {
    "id": 22,
    "name": "Pickaxe",
    "type": "consumable",
    "description": "Did someone say mine?",
    "value": 100,
    "max_stack": 1,
    "lose": true,
    "drawing": "drawings/items/consumables/Pickaxe_drawing.png",
    "icon": "items/consumables/Pickaxe.png",
    "rarity": 1,
    "stats": {
      "mining_stats": 20
      
    }
  },

  {
    "id": 23,
    "name": "Dynamite",
    "type": "consumable",
    "description": "Send everything to the air, apart from your goodies.",
    "value": 175,
    "max_stack": 5,
    "lose": true,
    "drawing": "drawings/items/consumables/Dynamite_drawing.png",
    "icon": "items/consumables/Dynamite.png",
    "rarity": 2,
    "stats": {
      "mining_stats": 50
      
    }
  },

  {
    "id": 24,
    "name": "Pistol Ammo",
    "type": "consumable",
    "ammo_type": 1,
    "description": "",
    "value": 2,
    "max_stack": 50,
    "lose": true,
    "drawing": "drawings/items/consumables/Pistol_ammo_drawing.png",
    "icon": "items/consumables/Pistol_ammo.png",
    "rarity": 1,
  
  },

  {
    "id": 25,
    "name": "Shotgun Ammo",
    "type": "consumable",
    "ammo_type": 2,
    "description": "",
    "value": 5,
    "max_stack": 20,
    "lose": true,
    "drawing": "drawings/items/consumables/Shotgun_ammo_drawing.png",
    "icon": "items/consumables/Shotgun_ammo.png",
    "rarity": 1,
  
  },

   {
    "id": 26,
    "name": "Rifle Ammo",
    "type": "consumable",
    "ammo_type": 2,
    "description": "",
    "value": 10,
    "max_stack": 10,
    "lose": true,
    "drawing": "drawings/items/consumables/Rifle_ammo_drawing.png",
    "icon": "items/consumables/Rifle_ammo.png",
    "rarity": 1,
  
  },

  //═══════════════════ Specials ════════════════════════════════════ 

  {
    "id": 27,
    "name": "Case",
    "type": "special",
    "description": "",
    "max_stack": 1,
    "lose": false,
    "icon": "items/trinkets/Case.png",
    "rarity": 1,
    "slots": [10, 20, 30],
    "upgrade_cost": [500, 3000]
  
  },

  {
    "id": 28,
    "name": "Shire",
    "type": "horse",
    "description": "Basic horse",
    "max_stack": 1,
    "value": 0,
    "lose": false,
    "icon": "Horse/Horse_01.png",
    "rarity": 1,
    "stats": {
      "slots": 0,
      "speed": 500,
      "strength": 0
    }
  },

  {
    "id": 29,
    "name": "The Arabian",
    "type": "horse",
    "description": "Sturdy and high horse. Carries a lot of load",
    "max_stack": 1,
    "value": 1000,
    "lose": false,
    "icon": "Horse/Horse_02.png",
    "rarity": 2,
    "stats": {
      "slots": 20,
      "speed": 500,
      "strength": 0
    }
  },

  {
    "id": 30,
    "name": "Mustang",
    "type": "horse",
    "description": "Excellent for combat and hunting",
    "max_stack": 1,
    "lose": false,
    "value": 2000,
    "icon": "Horse/Horse_03.png",
    "rarity": 3,
    "stats": {
      "slots": 5,
      "speed": 800,
      "strength": 15,
    }
  },

  {
    "id": 31,
    "name": "Thoroughbred",
    "type": "horse",
    "description": "Fast and agile for getting across the map quickly",
    "max_stack": 1,
    "lose": false,
    "value": 2500,
    "icon": "Horse/Horse_04.png",
    "rarity": 3,
    "stats": {
      "slots": 0,
      "speed": 2000,
      "strength": 0,
    }
  },
  
  {
    "id": 32,
    "name": "Kentucky Saddler",
    "type": "horse",
    "description": "Well-balanced horse. Brings a little bit of every status.",
    "max_stack": 1,
    "lose": false,
    "value": 2300,
    "icon": "Horse/Horse_05.png",
    "rarity": 3,
    "stats": {
      "slots": 10,
      "speed": 1200,
      "strength": 5,
    }
  },
]