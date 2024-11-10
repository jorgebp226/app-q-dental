// src/components/ui/tabs.jsx
import React, { useContext } from 'react';
import classNames from 'classnames';

const TabsContext = React.createContext();

export const Tabs = ({ children, value, onValueChange, className }) => {
  return (
    <TabsContext.Provider value={{ activeTab: value, setActiveTab: onValueChange }}>
      <div className={`${className}`}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className }) => {
  return <div className={`flex space-x-4 ${className}`}>{children}</div>;
};

export const TabsTrigger = ({ children, value, className }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  const handleClick = () => {
    if (setActiveTab) setActiveTab(value);
  };

  return (
    <button
      onClick={handleClick}
      className={classNames(
        'px-3 py-2 rounded-md focus:outline-none',
        activeTab === value ? 'bg-white shadow-md' : 'bg-transparent',
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, value, className }) => {
  const { activeTab } = useContext(TabsContext);
  return activeTab === value ? <div className={`${className}`}>{children}</div> : null;
};
