import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

const SectionHeader = ({ title, description, icon, action }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div className="flex items-center mb-4 md:mb-0">
        {icon && <div className="mr-3 text-primary">{icon}</div>}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {description && <p className="text-gray-600 mt-1">{description}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default SectionHeader;