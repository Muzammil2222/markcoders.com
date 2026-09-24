import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { createImageMorph } from '../../lib/imageMorph';

const ServiceShowcase = ({ previewImageRef, imageSrc, imageAlt = 'Showcase' }) => {
  const sectionRef = useRef(null);
  const targetImageContainerRef = useRef(null);
  const [morphComplete, setMorphComplete] = useState(false);

  useEffect(() => {
    if (!previewImageRef?.current || !targetImageContainerRef.current || !sectionRef.current || !imageSrc) return;

    const heroImg = previewImageRef.current;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 640px)', () => {
      setMorphComplete(false);
      heroImg.style.opacity = '1';

      return createImageMorph({
        heroImg,
        targetEl: targetImageContainerRef.current,
        triggerEl: sectionRef.current,
        cloneClass: 'service-morph-clone',
        src: imageSrc,
        alt: imageAlt,
        start: 'top 95%',
        end: 'top 15%',
        startRadius: 15,
        endRadius: 24,
        onCompleteChange: setMorphComplete,
      });
    });

    mm.add('(max-width: 639px)', () => {
      setMorphComplete(true);
      heroImg.style.opacity = '1';
      return () => {
        setMorphComplete(false);
      };
    });

    return () => {
      mm.revert();
      heroImg.style.opacity = '1';
    };
  }, [previewImageRef, imageSrc, imageAlt]);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full flex items-center justify-center bg-[#030712] py-8 md:py-12 lg:py-0 lg:h-screen overflow-x-hidden"
    >
      <div
        ref={targetImageContainerRef}
        className="relative w-[90%] h-auto aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:w-[90%] lg:h-[90%] mx-auto overflow-hidden rounded-[20px] lg:rounded-[24px] bg-[#0A0D14]"
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: morphComplete ? 1 : 0 }}
          draggable={false}
        />
      </div>
    </section>
  );
};

export default ServiceShowcase;
