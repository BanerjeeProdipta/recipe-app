import React from 'react';
import CreateTag from './tag/CreateTag';
import TagList from './tag/TagList';
import CreateIngredient from './ingredient/CreateIngredient';
import IngredientList from './ingredient/IngredientList';

const Sidebar = () => {
  return (
    <div>
      <div className="space-y-4 lg:w-48 lg:mr-6 lg:border-r">
        <CreateIngredient />
        <div className="max-h-64 overflow-auto">
          <IngredientList />
        </div>
        <CreateTag />
        <div className="max-h-64 overflow-auto">
          <TagList />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
