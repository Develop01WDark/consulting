// import React, { useState, useEffect, useRef } from 'react';
// // import './ImageSlider.css';

// interface SliderOptions {
//   sliderId: string;
//   startSlide: number;
//   effect: string;
//   effectRandom: boolean;
//   pauseTime: number;
//   transitionTime: number;
//   slices: number;
//   boxes: number;
//   hoverPause: number;
//   autoAdvance: boolean;
//   thumbnailsWrapperId: string;
//   license?: string;
// }

// interface SliderProps {
//   images: Array<{
//     src: string;
//     alt?: string;
//     link?: string;
//     caption?: string;
//   }>;
//   options?: Partial<SliderOptions>;
// }

// const ImageSlider: React.FC<SliderProps> = ({ images, options }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isHovering, setIsHovering] = useState(false);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   // Opciones predeterminadas del slider
//   const defaultOptions: SliderOptions = {
//     sliderId: "slider",
//     startSlide: 0,
//     effect: "series1",
//     effectRandom: false,
//     pauseTime: 2600,
//     transitionTime: 500,
//     slices: 12,
//     boxes: 8,
//     hoverPause: 1,
//     autoAdvance: true,
//     thumbnailsWrapperId: "thumbs",
//     license: "mylicense"
//   };

//   // Combinar opciones predeterminadas con las proporcionadas
//   const sliderOptions: SliderOptions = { ...defaultOptions, ...options };

//   // Función para avanzar al siguiente slide
//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % images.length);
//   };

//   // Función para ir al slide anterior
//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
//   };

//   // Función para ir a un slide específico
//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };

//   // Efecto para gestionar el avance automático
//   useEffect(() => {
//     if (sliderOptions.autoAdvance && isPlaying && !isHovering) {
//       timerRef.current = setTimeout(() => {
//         nextSlide();
//       }, sliderOptions.pauseTime);
//     }

//     return () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//       }
//     };
//   }, [currentSlide, isPlaying, isHovering, sliderOptions.autoAdvance, sliderOptions.pauseTime]);

//   // Efecto para establecer el slide inicial
//   useEffect(() => {
//     setCurrentSlide(sliderOptions.startSlide);
//   }, [sliderOptions.startSlide]);

//   // Manejadores de eventos para pausar/reanudar el slider al pasar el ratón
//   const handleMouseEnter = () => {
//     if (sliderOptions.hoverPause === 1) {
//       setIsHovering(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (sliderOptions.hoverPause === 1) {
//       setIsHovering(false);
//     }
//   };

//   return (
//     <>
//       <div className="sliderFrame" id="sliderFrame">
//         <div 
//           className="slider" 
//           id={sliderOptions.sliderId}
//           ref={sliderRef}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <div className="sliderInner">
//             {images.map((image, index) => (
//               <div 
//                 key={index} 
//                 style={{ 
//                   display: index === currentSlide ? 'block' : 'none',
//                   width: '100%',
//                   height: '100%'
//                 }}
//               >
//                 {image.link ? (
//                   <a href={image.link} className="imgLink" target="_blank" rel="noopener noreferrer">
//                     <img src={image.src} alt={image.alt || ""} style={{ display: 'block', width: '100%', height: '100%' }} />
//                   </a>
//                 ) : (
//                   <img src={image.src} alt={image.alt || ""} style={{ display: 'block', width: '100%', height: '100%' }} />
//                 )}
//                 {image.caption && (
//                   <div className="mc-caption" 
//                        dangerouslySetInnerHTML={{ __html: image.caption }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
          
//           {/* Navegación de bullets */}
//           <div className="navBulletsWrapper">
//             {images.map((_, index) => (
//               <div 
//                 key={index} 
//                 className={index === currentSlide ? 'active' : ''} 
//                 onClick={() => goToSlide(index)}
//               />
//             ))}
//           </div>
//         </div>
        
//         {/* Captions HTML personalizados */}
//         {images.map((image, index) => {
//           if (image.alt && image.alt.startsWith('#') && image.alt !== '#') {
//             const captionId = image.alt.substring(1);
//             return (
//               <div key={`caption-${index}`} id={captionId} style={{ display: 'none' }}>
//                 {/* Aquí iría el contenido del caption personalizado */}
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//     </>
//   );
// };

// export default ImageSlider;