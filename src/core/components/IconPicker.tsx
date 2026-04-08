import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CancelButton } from './Form';
import { CreateButton } from './ActionButtons';

interface Props {
  icons: [string, React.ElementType][];
  onSelect: (svgString: string) => void;
  onClose: () => void;
  browseIcon?: () => void;
}

export const IconPicker: React.FC<Props> = ({ onSelect, onClose, icons, browseIcon }) => {

  const handleSelect = (IconComponent: React.ElementType) => {
    const svgString = renderToStaticMarkup(<IconComponent className="w-4 h-4" />);
    onSelect(svgString);
    onClose();
  };

  return (
    <> 
    <div className="flex flex-col max-h-[70vh]">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 grid grid-cols-5 gap-2">
          {icons.length > 0 ? (
          icons.map(([name, Icon]) => (
            <button
              key={name}
              type="button"
              onClick={() => handleSelect(Icon)}
              className="flex flex-col items-center py-4 px-2 hover:bg-primary-50 rounded border border-gray-100 bg-gray-50 hover:border-primary-200 transition-all"
              title={name}
            >
              <Icon className="w-6 text-gray-600" />
              <span className="text-[10px] mt-1 text-gray-400 truncate w-full text-center leading-tight break-words whitespace-normal">
                {name.replace('Icon', '')}
              </span>
            </button>
          ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-gray-400 h-full text-sm">
            <p>Icon not found. Try browsing your local files.</p>
          </div>
          )}
        </div>
        
        <div className='flex justify-end pt-3 space-x-3'>
          <CancelButton onClick={() => onClose?.()}>
            Cancel
          </CancelButton>
          <CreateButton onClick={() => browseIcon?.()}>
            Browse
          </CreateButton>
        </div>
    </div>
    </>
  );
};