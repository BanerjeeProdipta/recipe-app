import { LinearProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomToaster } from '../../components/Toaster';
import { getToken } from '../../utils';

interface props {
  recipeId: number;
}

const UploadRecipeImage = ({ recipeId }: props) => {
  const [isPictureLoading, setPictureLoading] = useState(false);
  const [pictureProgress, setPictureProgress] = useState(0);
  const [picture, setPicture] = useState<File>();
  const [pictureError, setPictureError] = useState<string>();

  const handleChangePictureFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(undefined);
    if (event.target.files) {
      const image = event.target.files[0];
      event.target.value = '';
      if (image) {
        if (!['image/webp', 'image/png', 'image/jpeg', 'image/jpg'].includes(image.type)) {
          setPictureError('Only png, webp, jpg, and jpeg is allowed.');
          return;
        } else {
          setPicture(image);
          setPictureError(undefined);
          return;
        }
      }
    }
  };

  const handleResetPicture = () => {
    setPictureLoading(false);
    setPictureProgress(0);
    setPicture(undefined);
    setPictureError(undefined);
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit(async () => {
    try {
      setPictureProgress(0);
      if (picture) {
        setPictureLoading(true);
        await axios.post(
          `http://127.0.0.1:8000/api/recipe/recipes/${recipeId}/recipe-upload-image/`,
          { image: picture },
          {
            headers: {
              'Content-type': 'multipart/form-data',
              Authorization: `Token ${getToken() as string}`,
            },
          },
        );

        CustomToaster('Profile updated.', 'success');
        handleResetPicture();
      }
    } catch (error: any) {
      CustomToaster(error.response.data.detail || 'Image Upload Failed.', 'danger');
    }
  });

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xs space-y-6">
      <div className="space-y-1">
        <h2 className="font-semibold text-sm">Recipe Image</h2>
        <div>
          <input
            // enctype="multipart/form-data"
            accept="image/"
            className="hidden"
            id="browse-picture-file-button"
            type="file"
            onChange={handleChangePictureFile}
          />
          {picture && (
            <img
              className="h-40 w-60 object-cover border mr-4"
              src={picture && URL.createObjectURL(picture)}
              alt="Recipe"
            />
          )}

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 mt-1">
            {picture ? (
              <div className="flex justify-between items-center">
                <button
                  onClick={handleResetPicture}
                  className="border-2 bg-gray-200 px-3 rounded-lg font-medium py-2 mr-4"
                >
                  Delete
                </button>
                <button className="px-3 rounded-lg font-medium py-2 border-2 border-primary text-primary">
                  Submit
                </button>
              </div>
            ) : (
              <label htmlFor="browse-picture-file-button" className="w-full">
                <div className="border-2 border-primary px-3 cursor-pointer text-center bg-primary text-white rounded-lg font-medium py-2">
                  Browse
                </div>
              </label>
            )}
          </div>
        </div>
        {isPictureLoading && (
          <div className="flex items-center">
            <div className="flex-grow">
              <LinearProgress variant="determinate" value={pictureProgress} />
            </div>
            <p className="text-typGreen text-sm ml-2 font-semibold">{`${pictureProgress}%`}</p>
          </div>
        )}
        {pictureError && <p className="text-red-500 text-sm font-semibold">{pictureError}</p>}
      </div>
    </form>
  );
};

export default UploadRecipeImage;
