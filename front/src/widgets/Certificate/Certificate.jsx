import React, { useEffect, useRef } from 'react';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import certImage from 'shared/assets/img/certificate.png'
import cls from './Certificate.module.css'
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';





export const Certificate = (props) => {
    const { name, disabled } = props
    const canvasRef = useRef(null);

    const DrawImage = (context, certificateImage, width, height) => {

      // Рисование изображения на canvas
      context.drawImage(certificateImage, 0, 0, width, height);
  
      const fontSize = width * 0.025 
      // Настройка параметров текста
      context.font = `600 ${fontSize}px 'Montserrat'`;
      context.fillStyle = '#480660';
      context.textAlign = 'center';

      // Рисование имени на сертификате
      context.fillText(name, width / 3.9, height / 1.7);
    }
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
  
      const resizeCanvas = () => {
        canvas.width = window.innerWidth; // Установка ширины канваса равной ширине окна
        canvas.height = canvas.width * (certificateImage.height / certificateImage.width); // Подгонка высоты канваса для сохранения пропорций

        DrawImage(context, certificateImage, canvas.width, canvas.height)
        
      };

      const certificateImage = new Image();
      certificateImage.src = certImage; // Укажите путь к изображению сертификата
      
      certificateImage.onload = function () {
        resizeCanvas(); // Изначальное масштабирование канваса
        // Перемасштабирование канваса при изменении размера окна
        window.addEventListener('resize', resizeCanvas);
      };
  
      return () => {
        window.removeEventListener('resize', resizeCanvas); // Удаление обработчика события при размонтировании компонента
      };
    }, [name]);

    const DownloadCertificate = () => {
      const canvas = canvasRef.current;
      const tempCanvas = document.createElement('canvas');
      const tempContext = tempCanvas.getContext('2d');

      const certificateImage = new Image();
      certificateImage.src = certImage; // Укажите путь к изображению сертификата
      
      const resolution = 1920
    
      tempCanvas.width = resolution;
      tempCanvas.height = (resolution * canvas.height) / canvas.width;
    
      DrawImage(tempContext, certificateImage, tempCanvas.width, tempCanvas.height)
    
      const link = document.createElement('a');
      link.download = 'certificate.png';
      link.href = tempCanvas.toDataURL();
      link.click();
    };

    
  
    return (
        <>
          <div className={cls.container}>
              <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} className={cls.canvas} />
              { disabled && <div className={ClassNames(cls.disabled, {}, [])}></div> }
          </div>
            { !disabled && <Button 
              theme={ButtonTheme.LIGHT} 
              onClick={DownloadCertificate}
              className={cls.button}
          > 
              Скачать сертификат 
          </Button> }
        </>
    )
  };
  