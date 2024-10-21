import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';

(async () => {
    const files = await imagemin(['assets/**/*.{jpg,png,Webp}'], {
        destination: 'dist/images',
        plugins: [
            imageminMozjpeg({quality: 75}),
            imageminPngquant({
                quality: [0.6, 0.8]
            }),
            imageminWebp({quality: 75})
        ]
    });
    

    console.log('Images optimized:', files);
})();
