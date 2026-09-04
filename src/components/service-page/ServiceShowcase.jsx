import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceShowcase = ({ previewImageRef, imageSrc, imageAlt = 'Showcase' }) => {
  const sectionRef = useRef(null);
  const targetImageContainerRef = useRef(null);
  const cloneRef = useRef(null);
  const [morphComplete, setMorphComplete] = useState(false);

  useEffect(() => {
    if (!previewImageRef?.current || !targetImageContainerRef.current || !imageSrc) return;

    const heroImg = previewImageRef.current;
    const targetContainer = targetImageContainerRef.current;
    const mm = gsap.matchMedia();

    document.querySelectorAll('.service-morph-clone').forEach((el) => el.remove());

    mm.add('(min-width: 640px)', () => {
      setMorphComplete(false);
      heroImg.style.opacity = '1';

      let st;
      const timer = setTimeout(() => {
        const clone = document.createElement('img');
        clone.src = imageSrc;
        clone.alt = imageAlt;
        clone.className = 'service-morph-clone';
        clone.style.cssText = `
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          border-radius: 15px;
          object-fit: cover;
          will-change: transform, width, height, top, left;
          transition: none;
        `;
        document.body.appendChild(clone);
        cloneRef.current = clone;

        const positionClone = () => {
          const r = heroImg.getBoundingClientRect();
          clone.style.top = `${r.top}px`;
          clone.style.left = `${r.left}px`;
          clone.style.width = `${r.width}px`;
          clone.style.height = `${r.height}px`;
        };
        positionClone();
        gsap.set(clone, { opacity: 0 });

        st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 95%',
          end: 'top 15%',
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = self.progress;
            const heroRect = heroImg.getBoundingClientRect();
            const targetRect = targetContainer.getBoundingClientRect();

            const currentTop = heroRect.top + (targetRect.top - heroRect.top) * progress;
            const currentLeft = heroRect.left + (targetRect.left - heroRect.left) * progress;
            const currentWidth = heroRect.width + (targetRect.width - heroRect.width) * progress;
            const currentHeight = heroRect.height + (targetRect.height - heroRect.height) * progress;
            const currentRadius = 15 + (24 - 15) * progress;

            clone.style.top = `${currentTop}px`;
            clone.style.left = `${currentLeft}px`;
            clone.style.width = `${currentWidth}px`;
            clone.style.height = `${currentHeight}px`;
            clone.style.borderRadius = `${currentRadius}px`;

            if (progress > 0.02) {
              clone.style.opacity = '1';
              heroImg.style.opacity = '0';
            } else {
              clone.style.opacity = '0';
              heroImg.style.opacity = '1';
            }

            if (progress > 0.95) {
              setMorphComplete(true);
              clone.style.opacity = '0';
            } else {
              setMorphComplete(false);
            }
          },
        });
      }, 300);

      return () => {
        clearTimeout(timer);
        st?.kill();
        if (cloneRef.current) {
          cloneRef.current.remove();
          cloneRef.current = null;
        }
        heroImg.style.opacity = '1';
        setMorphComplete(false);
      };
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
      if (cloneRef.current) {
        cloneRef.current.remove();
        cloneRef.current = null;
      }
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
