import Message_image from '../../../assets/sent.png';
import Recipient_image from '../../../assets/recepient.png';
import sent_image from '../../../assets/message balance.png';
import ChartOne from './graphics/ChartOne';
import ChartTwo from './graphics/ChartTwo';
import ChartFour from './graphics/ChartFour';
import ChartThree from './graphics/ChartThree';

export default function Dashboard() {
  return (
    <div className='overflow-y-scroll pt-5 pb-10 max-w-[1440px]'>
      <UpperBoxes />
      <div className="flex flex-col">
        <ChartOne />
        <div className="w-full justify-between gap-2 flex flex-col md:flex-row">
          <ChartThree />
          <ChartFour />
        </div>
        <ChartTwo />
      </div>
    </div>
  );
}

function UpperBoxes() {
  return (
    <div className="w-full border-b pb-5 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-3 justify-between items-center">
      <div className="w-full flex flex-col items-center justify-center shadow-md border rounded-md cursor-pointer bg-white">
        <div className="p-2 flex flex-row items-center justify-center w-full">
          <img src={Message_image} alt="message icon" className="w-10 mr-4"></img>
          <p className="text-lg font-bold">450</p>
        </div>
        <p className="text-sm text-slate-400 pb-4">Message balance</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center shadow-md border rounded-md cursor-pointer bg-white">
        <div className="p-2 flex flex-row items-center justify-center w-full">
          <img src={sent_image} alt="message icon" className="w-10 mr-4"></img>
          <p className="text-xl font-bold">12,310</p>
        </div>
        <p className="text-sm text-slate-400 pb-4">Sent Messages</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center shadow-md border rounded-md cursor-pointer bg-white">
        <div className="p-2 flex flex-row items-center justify-center w-full">
          <img src={Recipient_image} alt="message icon" className="w-10 mr-4"></img>
          <p className="text-xl font-bold">2,310</p>
        </div>
        <p className="text-sm text-slate-400 pb-4">Recipients</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center shadow-md border rounded-md cursor-pointer bg-white">
        <div className="p-2 flex flex-row items-center justify-center w-full">
          <img src={Recipient_image} alt="message icon" className="w-10 mr-4"></img>
          <p className="text-xl font-bold">210</p>
        </div>
        <p className="text-sm text-slate-400 pb-4">Recipient Groups</p>
      </div>
    </div>
  );
}

