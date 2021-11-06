import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { getToken } from '../../../utils';
import { ITagResponse } from '../../../types';
import { CircularProgress } from '@material-ui/core';

const fetchTags = async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/recipe/tags/`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token ${getToken() as string}`,
    },
  });
  return response.data;
};

const TagList = () => {
  const tags = useQuery<ITagResponse[], Error>(['tags'], () => fetchTags(), {
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {tags.data ? (
        <div className="flex flex-wrap">
          {tags.data.map((ingredient) => (
            <div key={ingredient.id}>
              <div className="px-2 rounded-lg text-xs py-1 bg-primary bg-opacity-10 text-primary font-semibold mr-1 mb-2">
                <p>{ingredient.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : tags.isLoading ? (
        <CircularProgress />
      ) : (
        <p>No tags available.</p>
      )}
    </div>
  );
};

export default TagList;