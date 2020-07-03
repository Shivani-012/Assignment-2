class mealPackageDB 
{
    packages = [];

    constructor(){
        this.packages.push({title:"Value Package", image:"value_package.jpg", price:96.00, foodCategory:"Breakfast", noOfMeals:"18", contentSummary:"All of our bestselling Value meals in one package for even less", topPackage:true});
        this.packages.push({title:"Gluten-Free Package", image:"gluten_free_package.jpg", price:117.00, foodCategory:"Lunch & Dinner", noOfMeals:"12", contentSummary: "A gluten-free package with the same balanced profile as our other packages",topPackage:true});
        this.packages.push({title: "Veggie Package", image: "veggie_package.jpg", price: 159.00, foodCategory: "Dinner", noOfMeals:15, contentSummary: "A vegetarian-friendly package with a natural and nutrient-rich approach", topPackage: true});
        this.packages.push({title:"Vegan Package", image:"vegan_package.jpg", price: 159.00,foodCategory:"Breakfast", noOfMeals: 15, contentSummary:"A fully plant-based package featuring vegan meat and no animal products", topPackage:true});
        this.packages.push({title:"Fat-Burner Package", image:"fat_burner_package.jpg", price: 159.00,foodCategory:"Nutritional", noOfMeals: 12, contentSummary:"Low carb, nutrient-rich meals with fat-burning profiles to support fat loss", topPackage:false});
        this.packages.push({title:"Keto Package", image:"keto_package.jpg", price: 159.00, foodCategory:"Keto", noOfMeals: 12, contentSummary:"High fat, low carb meals with moderate protein to achieve and sustain ketosis", topPackage:false});
        this.packages.push({title:"Muscle Gain Package", image:"muscle_gain_package.jpg", price: 159.00,foodCategory:"Nutritional", noOfMeals: 12, contentSummary:"Higher protein and calorie portions to support your muscle gain momentum", topPackage:false});
        this.packages.push({title:"Weight Loss Package", image:"weight_loss_package.jpg", price: 145.00,foodCategory:"Nutritional", noOfMeals: 10, contentSummary:"High protein, low-calorie meals with a nutrient profile tuned for weight loss", topPackage:false});
    }

    getPackages(){
        return this.packages;
    }

    getTopPackages(){
        let topPacks = [];

        this.packages.forEach(element =>{
            if (element.topPackage == true){
                topPacks.push(element);
            }
        })
        return topPacks;
    }
}


// class mealPackage 
// {
//     title;
//     image;
//     price;
//     foodCategory;
//     noOfMeals;
//     contentSummary;
//     topPackage;
// }

// mealPackage = [
//     {
//         title : "Buffalo Goat Chees Chicken",
//         image : "Buffalo_Goat_Cheese_Chicken_plate_1_2048x2048.jpg",
//         price : 11.95,
//         foodCategory : "Keto",
//         noOfMeals : 2,
//         contentSummary : "The name itself says it all! Our ketosis friendly rendition on some of our favourite items to cook with. Spicy Buffalo sauce melted whipped goat cheese nappe over roast chicken and seasonal vegetables. Great for lunch or dinner!",
//         topPackage : true
//     },
//     {
//         title : "Coconut Curry Shrimp",
//         image : "Coconut_Curry_Shrimp_plate_4_2048x2048.jpg",
//         price : 11.95,
//         foodCategory : "Dinner",
//         noOfMeals : 1,
//         contentSummary : "Toasted Cumin and Coconut are toasted and brought together with sautéed shrimp. Our Coconut Curry is delectable in each bite!",
//         topPackage : true
//     },
//     {
//         title : "Garlic Butter Salmon",
//         image : "Garlic_Butter_Salmon_plate_1_2048x2048.jpg",
//         price : 11.95,
//         foodCategory : "Dinner",
//         noOfMeals : 1,
//         contentSummary : "For a quick delicious and easy option, our whipped garlic butter on our baked salmon is ready in minutes for you with the hassle of all the preparation! Enjoy this at home or on the road!",
//         topPackage : true
//     },
//     {
//         title : "Pan Roast Mushroom Chicken",
//         image : "Pan_Roast_Mushroom_Chicken_plate_1_2048x2048.jpg",
//         price : 10.76,
//         foodCategory : "Dinner",
//         noOfMeals : 1,
//         contentSummary : "Authentic Pan Gravy is created with hints of tarragon, black pepper and house spices, Chicken Roasted to provide succulent flavour in each bite!",
//         topPackage : true
//     }
// ]


module.exports = mealPackageDB;