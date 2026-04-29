import { AnimatedCounter } from "../../core/components/AnimatedCounter";

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Counter: React.FC<Props> = ({ children, title, description }) => {
  return (
    <div className="col-span-3 shadow-md bg-white p-5 lg:h-44 md:h-36 h-full space-y-2 flex flex-col justify-between rounded-lg text-gray-600 hover:text-white hover:bg-primary-500 transition-colors duration-300 md:text-left text-center">
      {children}
      <div className="lg:space-y-2 space-y-1">
        <div className="font-semibold lg:text-base text-sm">{title}</div>
        <div className="text-sm">{description}</div>
      </div>
    </div>
  );
};



const DataCounters = [
  {
    value: 10,
    title: 'Products',
    description: 'Available for Sale.',
  },
  {
    value: 10,
    title: 'Categories',
    description: 'Active Categories.',
  },
  {
    value: 15,
    title: 'On-Going',
    description: 'On-Going Orders',
  },
  {
    value: 25,
    title: 'Orders Complete',
    description: 'Completed Orders',
  },
];

export const DashboardList = () => {
    return (
        <>
            <div className="grid md:gap-4 lg:gap-5 gap-3 lg:grid-cols-12 md:grid-cols-6 grid-cols-3 items-stretch w-full">
                {DataCounters.map((item, index) => (
                    <Counter
                        key={index}
                        title={item.title}
                        description={item.description}
                    >
                        <AnimatedCounter target={item.value} />
                    </Counter>
                ))}
            </div>
        </>
    )
}