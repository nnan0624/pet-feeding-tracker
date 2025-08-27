import React, { useState, useEffect } from 'react';
import { PawPrint, Calendar, Clock, History, AlertCircle, CheckCircle, Bell } from 'lucide-react';

const PetFeedingTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pets, setPets] = useState([
    { 
      id: 1, 
      name: 'Whiskers', 
      avatar: '🐱',
      schedule: [
        { time: '07:30', amount: '1/2 can', completed: false },
        { time: '17:30', amount: '1/2 can', completed: false }
      ]
    },
    { 
      id: 2, 
      name: 'Buddy', 
      avatar: '🐕',
      schedule: [
        { time: '08:00', amount: '1 cup', completed: false },
        { time: '18:00', amount: '1 cup', completed: false }
      ]
    }
  ]);
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [feedingHistory, setFeedingHistory] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const markFed = (petId, timeSlot) => {
    const now = new Date();
    const feedingRecord = {
      id: Date.now(),
      petName: pets.find(p => p.id === petId).name,
      time: timeSlot.time,
      amount: timeSlot.amount,
      completedAt: now,
      date: now.toISOString().split('T')[0]
    };

    setFeedingHistory(prev => [feedingRecord, ...prev]);
    
    setPets(pets.map(pet => {
      if (pet.id === petId) {
        return {
          ...pet,
          schedule: pet.schedule.map(slot => 
            slot.time === timeSlot.time 
              ? { ...slot, completed: true, completedAt: now }
              : slot
          )
        };
      }
      return pet;
    }));
  };

  const isOverdue = (pet, timeSlot) => {
    if (timeSlot.completed) return false;
    
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const scheduleTime = new Date(`${today}T${timeSlot.time}`);
    
    return now > scheduleTime;
  };

  const getTodaysSchedule = () => {
    const schedule = [];
    pets.forEach(pet => {
      pet.schedule.forEach(slot => {
        schedule.push({
          ...slot,
          petName: pet.name,
          petId: pet.id,
          avatar: pet.avatar,
          isOverdue: isOverdue(pet, slot)
        });
      });
    });
    
    return schedule.sort((a, b) => a.time.localeCompare(b.time));
  };

  const getOverdueFeedings = () => {
    return getTodaysSchedule().filter(item => item.isOverdue && !item.completed);
  };

  const getCompletedFeedings = () => {
    return getTodaysSchedule().filter(item => item.completed);
  };

  const getUpcomingFeedings = () => {
    return getTodaysSchedule().filter(item => !item.completed && !item.isOverdue);
  };

  const renderDashboard = () => {
    const overdueCount = getOverdueFeedings().length;
    const upcomingCount = getUpcomingFeedings().length;
    const completedCount = getCompletedFeedings().length;

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h3 className="font-semibold text-gray-800">Overdue</h3>
            </div>
            <div className="text-3xl font-bold text-red-500 mb-1">{overdueCount}</div>
            <p className="text-sm text-gray-600">Feedings overdue</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold text-gray-800">Upcoming</h3>
            </div>
            <div className="text-3xl font-bold text-blue-500 mb-1">{upcomingCount}</div>
            <p className="text-sm text-gray-600">Feedings today</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold text-gray-800">Completed</h3>
            </div>
            <div className="text-3xl font-bold text-green-500 mb-1">{completedCount}</div>
            <p className="text-sm text-gray-600">Feedings done</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overdue Feedings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-bold text-gray-800">Overdue Feedings</h2>
            </div>
            <div className="space-y-3">
              {getOverdueFeedings().map((item, index) => (
                <div key={index} className="bg-red-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                      {item.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{item.petName}</div>
                      <div className="text-sm text-gray-600">{item.time} • {item.amount}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => markFed(item.petId, item)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Mark Fed
                  </button>
                </div>
              ))}
              {getOverdueFeedings().length === 0 && (
                <div className="text-gray-500 text-center py-8">No overdue feedings</div>
              )}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-800">Today's Schedule</h2>
            </div>
            <div className="space-y-3">
              {getTodaysSchedule().map((item, index) => (
                <div key={index} className={`rounded-lg p-4 flex items-center justify-between ${
                  item.completed ? 'bg-green-50' : item.isOverdue ? 'bg-red-50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                      {item.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{item.petName}</div>
                      <div className="text-sm text-gray-600">{item.time} • {item.amount}</div>
                    </div>
                  </div>
                  {!item.completed ? (
                    <button
                      onClick={() => markFed(item.petId, item)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Mark Fed
                    </button>
                  ) : (
                    <div className="text-green-600 font-medium">✓ Done</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMyPets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">My Pets</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Add Pet
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pets.map(pet => (
          <div key={pet.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                {pet.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                <p className="text-gray-600">{pet.schedule.length} feeding times</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {pet.schedule.map((slot, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-700">{slot.time}</span>
                  <span className="text-gray-600">{slot.amount}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSchedules = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Feeding Schedules</h2>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Today's Full Schedule</h3>
        <div className="space-y-3">
          {getTodaysSchedule().map((item, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              item.completed ? 'bg-green-50 border-green-400' : 
              item.isOverdue ? 'bg-red-50 border-red-400' : 'bg-blue-50 border-blue-400'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.avatar}</span>
                  <div>
                    <div className="font-semibold">{item.petName}</div>
                    <div className="text-sm text-gray-600">{item.time} - {item.amount}</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.completed ? 'bg-green-100 text-green-700' :
                  item.isOverdue ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.completed ? 'Completed' : item.isOverdue ? 'Overdue' : 'Upcoming'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Feeding History</h2>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="space-y-3">
          {feedingHistory.map((record) => (
            <div key={record.id} className="p-4 border border-gray-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">{record.petName}</div>
                  <div className="text-sm text-gray-600">
                    {record.time} - {record.amount}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {record.completedAt.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
          {feedingHistory.length === 0 && (
            <div className="text-gray-500 text-center py-8">No feeding history yet</div>
          )}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Calendar },
    { id: 'pets', label: 'My Pets', icon: PawPrint },
    { id: 'schedules', label: 'Schedules', icon: Clock },
    { id: 'history', label: 'History', icon: History }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <PawPrint className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-800">Pet Feeding Tracker</h1>
          </div>
          <p className="text-gray-600">Keep your furry friends happy and healthy</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'border-orange-500 text-orange-600' 
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'pets' && renderMyPets()}
        {activeTab === 'schedules' && renderSchedules()}
        {activeTab === 'history' && renderHistory()}
      </div>
    </div>
  );
};

export default PetFeedingTracker;
