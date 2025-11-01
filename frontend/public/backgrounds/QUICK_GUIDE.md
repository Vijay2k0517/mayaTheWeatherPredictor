# Quick Guide: Adding Weather Background Images

## Step 1: Download Free Images

Visit these websites and download high-quality images:

### Unsplash (Recommended)

1. Go to https://unsplash.com
2. Search for each weather condition:
   - "sunny sky" or "blue sky sunshine"
   - "cloudy sky" or "overcast clouds"
   - "rain storm" or "rainy weather"
   - "fog mist" or "misty morning"
   - "storm clouds" or "thunder lightning"
   - "clear sky gradient" (for default)

### Image Specifications

- **Resolution**: 1920x1080 or higher (Full HD+)
- **Format**: JPG (smaller file size) or PNG
- **Orientation**: Landscape
- **Style**: Natural, vibrant, high contrast

## Step 2: Save Images

Save the downloaded images with these exact names:

```
c:\Users\vijay\OneDrive\Desktop\wheatherApp\frontend\public\backgrounds\
├── default.jpg      (clear gradient or mild sky)
├── sunny.jpg        (bright sun, blue sky)
├── cloudy.jpg       (gray overcast clouds)
├── rainy.jpg        (rain or water droplets)
├── foggy.jpg        (mist or fog)
└── stormy.jpg       (dark storm clouds)
```

## Step 3: Optimize Images (Optional)

To improve loading speed, compress images using:

- **TinyPNG**: https://tinypng.com (free, easy)
- **Squoosh**: https://squoosh.app (by Google)
- **ImageOptim**: Desktop app for batch optimization

Target: Reduce file size to 200-500KB per image

## Step 4: Test

1. Open http://localhost:3000
2. Ask for weather in different cities
3. Notice background changes based on weather condition
4. Background transitions smoothly (1 second fade)

## Alternative: Use Gradient Fallbacks

If you don't add images, the app will use beautiful CSS gradients automatically:

- ☀️ Sunny: Orange-yellow gradient
- ☁️ Cloudy: Gray-slate gradient
- 🌧️ Rainy: Blue-indigo gradient
- 🌫️ Foggy: Misty gray gradient
- ⛈️ Stormy: Purple-dark gradient

**The app looks professional even without images!**

## Quick Image Sources

### Unsplash Direct Links:

- Sunny: https://unsplash.com/s/photos/sunny-sky
- Cloudy: https://unsplash.com/s/photos/cloudy-sky
- Rainy: https://unsplash.com/s/photos/rain-weather
- Foggy: https://unsplash.com/s/photos/fog-mist
- Stormy: https://unsplash.com/s/photos/storm-clouds

### Pexels:

https://www.pexels.com/search/weather/

### Pixabay:

https://pixabay.com/images/search/weather/

---

**Note**: All images from Unsplash, Pexels, and Pixabay are royalty-free and can be used in your project!
