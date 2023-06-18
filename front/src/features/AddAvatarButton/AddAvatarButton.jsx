import React, { useRef } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './AddAvatarButton.module.css';
import { Button } from 'shared/UI/Button/Button';
import { AddImageIcon } from 'shared/UI/AddImageIcon/AddImageIcon'
import { UserSlice } from 'entities/User';
import { useDispatch, useSelector } from 'react-redux';
import { baseApiUrl, baseUrl } from 'shared/lib/ApiConfig/ApiConfig';
import { PopupsSlice } from 'entities/Popups';

export const AddAvatarButton = (props) => {
    const { className } = props;
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    const { access_token, avatar } = useSelector(state => state.user)
    
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };
    
    const handleFileChange = async  (event) => {
        const selectedFile = event.target.files[0];

        const maxSize = 20 * 1024 * 1024; // 20 МБ в байтах
        if (selectedFile.size > maxSize) {
            dispatch(PopupsSlice.actions.openMessage('Размер файла превышает допустимый предел (20 МБ).'));
        return;
        }

        if (selectedFile && selectedFile.type.startsWith('image/')) {
          // Проверка, что выбран файл с типом "image/*"
          const formData = new FormData();
          formData.append('avatar', selectedFile);
    
          try {
            // Отправка файла на сервер с помощью RTK Query
            fetch(`${baseApiUrl}/v1/user/`, {
            method: 'PATCH',
            headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                body: formData,
            })
                .then(response => response.json())
                .then(responseBody => {
                    console.log(responseBody)
                    dispatch(UserSlice.actions.setUser(responseBody.data))
                })
          } catch (error) {
          }
        } else {
            dispatch(PopupsSlice.actions
                .openMessage('Неверное расширение файла, пожалуйста выберите изображение формата .jpeg, .jpg, .png'))
        }
    
    };

    return (
        <>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
            {
                avatar
                ?
                    <div className={cls.imgContainer}>
                        <img 
                            src={`${baseUrl}${avatar}`} 
                            onClick={handleUploadClick} 
                            className={ClassNames(cls.img, {}, [className])} alt="" 
                        />
                    </div>
                :
                <Button onClick={handleUploadClick} className={ClassNames(cls.button, {}, [className])}>
                    <AddImageIcon className={cls.icon} />
                </Button>
            }
        </>
        
 );
}