#!/bin/sh

# Create base directory structure
mkdir -p public/symbols/food

# Function to download with user agent
download_image() {
    name=$1
    url=$2
    echo "Downloading ${name}..."
    curl -L -A "Mozilla/5.0" "${url}" -o "public/symbols/food/${name}.png"
}

echo "Downloading food images..."

# Main Dishes
download_image "rice" "https://cdn-icons-png.flaticon.com/512/3174/3174880.png"
download_image "pasta" "https://cdn-icons-png.flaticon.com/512/2497/2497905.png"
download_image "meat" "https://cdn-icons-png.flaticon.com/512/5787/5787180.png"
download_image "fish" "https://cdn-icons-png.flaticon.com/512/2930/2930744.png"
download_image "soup" "https://cdn-icons-png.flaticon.com/512/2497/2497909.png"
download_image "salad" "https://cdn-icons-png.flaticon.com/512/2515/2515263.png"
download_image "pizza" "https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
download_image "chicken" "https://cdn-icons-png.flaticon.com/512/1046/1046751.png"

# Fruits
download_image "apple" "https://cdn-icons-png.flaticon.com/512/415/415733.png"
download_image "banana" "https://cdn-icons-png.flaticon.com/512/3143/3143645.png"
download_image "orange" "https://cdn-icons-png.flaticon.com/512/415/415731.png"
download_image "grape" "https://cdn-icons-png.flaticon.com/512/2224/2224241.png"
download_image "strawberry" "https://cdn-icons-png.flaticon.com/512/590/590685.png"
download_image "pear" "https://cdn-icons-png.flaticon.com/512/415/415736.png"
download_image "pineapple" "https://cdn-icons-png.flaticon.com/512/3143/3143665.png"
download_image "watermelon" "https://cdn-icons-png.flaticon.com/512/415/415751.png"

# Vegetables
download_image "carrot" "https://cdn-icons-png.flaticon.com/512/415/415728.png"
download_image "tomato" "https://cdn-icons-png.flaticon.com/512/1202/1202125.png"
download_image "potato" "https://cdn-icons-png.flaticon.com/512/5016/5016784.png"
download_image "lettuce" "https://cdn-icons-png.flaticon.com/512/1682/1682917.png"
download_image "broccoli" "https://cdn-icons-png.flaticon.com/512/765/765544.png"
download_image "cucumber" "https://cdn-icons-png.flaticon.com/512/2224/2224281.png"

# Drinks
download_image "water" "https://cdn-icons-png.flaticon.com/512/2997/2997661.png"
download_image "juice" "https://cdn-icons-png.flaticon.com/512/3050/3050154.png"
download_image "milk" "https://cdn-icons-png.flaticon.com/512/2674/2674486.png"
download_image "coffee" "https://cdn-icons-png.flaticon.com/512/924/924514.png"
download_image "tea" "https://cdn-icons-png.flaticon.com/512/1047/1047503.png"
download_image "soda" "https://cdn-icons-png.flaticon.com/512/1046/1046782.png"

# Snacks
download_image "sandwich" "https://cdn-icons-png.flaticon.com/512/883/883515.png"
download_image "cookie" "https://cdn-icons-png.flaticon.com/512/541/541732.png"
download_image "yogurt" "https://cdn-icons-png.flaticon.com/512/3501/3501161.png"
download_image "chips" "https://cdn-icons-png.flaticon.com/512/2515/2515264.png"
download_image "chocolate" "https://cdn-icons-png.flaticon.com/512/2413/2413277.png"
download_image "ice-cream" "https://cdn-icons-png.flaticon.com/512/938/938063.png"

# Breakfast
download_image "bread" "https://cdn-icons-png.flaticon.com/512/3014/3014538.png"
download_image "eggs" "https://cdn-icons-png.flaticon.com/512/837/837577.png"
download_image "cereal" "https://cdn-icons-png.flaticon.com/512/3014/3014608.png"
download_image "pancake" "https://cdn-icons-png.flaticon.com/512/6518/6518098.png"
download_image "toast" "https://cdn-icons-png.flaticon.com/512/3014/3014544.png"

echo "All images downloaded successfully!"
echo "Images are located in public/symbols/food/"

# Print verification command
echo -e "\nTo verify the images, run:"
echo "ls -l public/symbols/food/"