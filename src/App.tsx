import { useState, useEffect } from 'react';
import { 
  Home, 
  UtensilsCrossed, 
  GraduationCap, 
  MessageCircle, 
  User, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Send, 
  Mic, 
  Camera, 
  Zap, 
  X, 
  Scan, 
  PhoneCall, 
  PlayCircle, 
  BookOpen, 
  Video, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  Target, 
  Bookmark, 
  RotateCcw, 
  Shield, 
  Settings2, 
  Palette,
  Apple,
  Flame,
  Droplets,
  Beef,
  Leaf,
  Plus,
  History,
  Info,
  Sparkles,
  Search,
  ArrowRight,
  TrendingUp,
  Brain,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { Input } from './components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Textarea } from './components/ui/textarea';
import { Separator } from './components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ScrollArea } from './components/ui/scroll-area';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import logoImage from 'figma:asset/04d3cae0654cf46139081a97b485d93e8e040014.png';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentTheme, setCurrentTheme] = useState('sunny');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedFood, setAnalyzedFood] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const themes = {
    sunny: {
      name: 'Sunny Day',
      colors: {
        primary: 'sky-400',
        primaryHover: 'sky-500',
        accent: 'yellow-400',
        gradient: 'from-sky-400 via-blue-400 to-yellow-300',
        gradientHover: 'from-sky-500 via-blue-500 to-yellow-400',
        ring: 'ring-sky-400',
        border: 'border-sky-400',
        text: 'text-sky-500',
        bg: 'bg-sky-400',
        bgHover: 'bg-sky-500',
        icon: 'text-sky-500'
      }
    },
    jungle: {
      name: 'Fruit Salad',
      colors: {
        primary: 'green-400',
        primaryHover: 'green-500', 
        accent: 'rose-400',
        gradient: 'from-green-400 via-emerald-400 to-rose-400',
        gradientHover: 'from-green-500 via-emerald-500 to-rose-500',
        ring: 'ring-emerald-400',
        border: 'border-green-400',
        text: 'text-green-500',
        bg: 'bg-green-400',
        bgHover: 'bg-green-500',
        icon: 'text-green-500'
      }
    }
  };

  const theme = themes[currentTheme];

  const appBg = isDarkMode ? 'bg-gray-950' : 'bg-white';
  const cardBg = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBorder = isDarkMode ? 'border-gray-800' : 'border-gray-200';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const navBg = isDarkMode ? 'bg-gray-900/80' : 'bg-white/80';
  const navBorder = isDarkMode ? 'border-gray-800' : 'border-gray-200';

  const [mealLogs, setMealLogs] = useState([
    {
      id: 1,
      name: 'Avocado Toast & Egg',
      calories: 450,
      time: '08:30 AM',
      type: 'Breakfast',
      nutrients: { protein: 18, carbs: 32, fat: 28 },
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      calories: 380,
      time: '01:15 PM',
      type: 'Lunch',
      nutrients: { protein: 42, carbs: 12, fat: 15 },
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    }
  ]);

  const [nutritionGuides, setNutritionGuides] = useState([
    {
      id: 1,
      title: 'Yummy Building Blocks',
      duration: '10 min',
      progress: 60,
      category: 'Growth',
      difficulty: 'Beginner',
      steps: [
        { id: 1, title: 'What is Protein?', completed: true, content: 'Proteins are like tiny bricks that build your muscles!' },
        { id: 2, title: 'Power Carbs', completed: true, content: 'Carbs are like the gas in a race car - they make you GO!' },
        { id: 3, title: 'Super Healthy Fats', completed: false, content: 'Good fats help your brain think faster!' }
      ],
      quiz: [
        {
          question: 'What is the primary function of protein?',
          options: ['Fast energy', 'Muscle building', 'Water storage', 'Thermal insulation'],
          correct: 1,
          explanation: 'Protein provides the amino acids necessary for muscle repair and growth.'
        }
      ]
    },
    {
      id: 2,
      title: 'How Veggies Give You Superpowers',
      duration: '15 min',
      progress: 0,
      category: 'Health',
      difficulty: 'Intermediate',
      steps: [
        { id: 1, title: 'Intro to Microbiome', completed: false, content: 'Your gut houses trillions of bacteria that influence your immune system.' },
        { id: 2, title: 'Probiotics & Prebiotics', completed: false, content: 'Learn the difference between beneficial bacteria and the fibers that feed them.' }
      ],
      quiz: []
    }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'assistant', text: 'Hi! I\'m Nutri-fy, your AI health pal. Scan your snacks or ask me anything about yummy healthy food!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleScan = () => {
    setShowScanner(true);
  };

  const handleCapture = () => {
  setIsAnalyzing(true);
  setTimeout(() => {
    setIsAnalyzing(false);
    setAnalyzedFood({
      name: 'Chicken Adobo',
      calories: 550, // approximate for one serving
      content: "Hiya! I'm Chicken Adobo, a tasty Filipino classic! I've got protein to help you grow strong, a bit of yummy fat for energy, and a little rice love if you eat me with it!",
      nutrients: [
        { label: 'Power (Protein)', value: '35g', percent: 35, color: 'red' },   // chicken protein
        { label: 'Fuel (Carbs)', value: '20g', percent: 15, color: 'amber' },   // mostly from rice
        { label: 'Brain (Fat)', value: '30g', percent: 50, color: 'yellow' },   // fat from chicken and oil
        { label: 'Tummy (Fiber)', value: '2g', percent: 10, color: 'green' }   // minimal fiber
      ],
      facts: [
        "A classic Filipino dish loved by many",
        "High in protein from chicken",
        "Cooked with soy sauce, vinegar, garlic, and spices"
        ],
        image: 'https://th.bing.com/th/id/R.dc315c35c758abfcc8aa86c79963a858?rik=AGuy8XjcJ6E8Vw&riu=http%3a%2f%2f2.bp.blogspot.com%2f-DP9qENXZGBg%2fUQVV0WEH-ZI%2fAAAAAAAAACk%2fWgwp7FY2-M4%2fs1600%2fAdobo.jpg&ehk=mql2pCB0FO4ZzwsqjZcYWbgkiuod73i9MaZm0UDUdN8%3d&risl=&pid=ImgRaw&r=0'
      });
    }, 2500);
  };

  const closeScanner = () => {
    setShowScanner(false);
    setAnalyzedFood(null);
  };

  const switchTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setCurrentTheme(themeKeys[nextIndex]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      let response = "That's a great question! Based on your goals, I recommend focusing on whole foods and high-quality protein sources.";
      if (chatInput.toLowerCase().includes('calorie')) {
        response = "To lose weight sustainably, aim for a 300-500 calorie deficit daily. Make sure to keep your protein intake high to preserve muscle mass!";
      } else if (chatInput.toLowerCase().includes('breakfast')) {
        response = "A balanced breakfast should include protein, healthy fats, and complex carbs. How about some overnight oats with chia seeds and berries?";
      }
      setChatMessages(prev => [...prev, { id: Date.now(), sender: 'assistant', text: response }]);
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${appBg} flex flex-col max-w-md mx-auto relative overflow-hidden transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-4 left-4 right-4 z-[100] max-w-md mx-auto"
          >
            <div className={`bg-gradient-to-r ${theme.colors.gradient} text-black px-4 py-3 rounded-xl shadow-lg flex items-center justify-between`}>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-bold">{successMessage}</span>
              </div>
              <button onClick={() => setShowSuccessMessage(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-900/50' : 'bg-white/80'} backdrop-blur-md p-4 sticky top-0 z-40 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className={`w-10 h-10 bg-gradient-to-br ${theme.colors.gradient} rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300`}
              style={{
                mask: `url(${logoImage}) center/contain no-repeat`,
                WebkitMask: `url(${logoImage}) center/contain no-repeat`,
                filter: isDarkMode ? 'brightness(1.2) contrast(1.1)' : 'none'
              }}
            />
            <div>
              <h1 className={`text-xl font-black bg-gradient-to-r ${theme.colors.gradient} bg-clip-text text-transparent tracking-tighter`}>NUTRI-FY</h1>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className={`${textSecondary} text-[10px] uppercase tracking-widest font-bold`}>AI Assistant Active</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="outline"
              onClick={toggleDarkMode}
              className={`rounded-xl ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} hover:bg-gray-100 dark:hover:bg-gray-800 transition-all`}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={switchTheme}
              className={`rounded-xl ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} hover:bg-gray-100 dark:hover:bg-gray-800 transition-all`}
            >
              <Palette className={`w-5 h-5 ${isDarkMode ? theme.colors.text : 'text-gray-600'}`} />
            </Button>
            <Avatar className={`w-9 h-9 border-2 ${isDarkMode ? 'border-gray-800' : 'border-gray-100'} shadow-sm`}>
              <AvatarImage src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto">
        {activeTab === 'home' && (
          <div className="p-4 space-y-6">
            {/* Stats Overview */}
            <section className="grid grid-cols-2 gap-4">
              <Card className={`${cardBg} ${cardBorder} shadow-sm relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 p-2 opacity-10 ${isDarkMode ? theme.colors.text : 'text-orange-500'}`}>
                  <Flame className="w-12 h-12" />
                </div>
                <CardContent className="p-4">
                  <p className={`${textSecondary} text-xs font-bold uppercase tracking-wider mb-1`}>Calories</p>
                  <div className="flex items-end space-x-1">
                    <h3 className={`text-2xl font-black ${textPrimary}`}>1,240</h3>
                    <span className="text-gray-400 text-xs mb-1">/ 2,200</span>
                  </div>
                  <Progress value={56} className="h-1.5 mt-3 bg-gray-200 dark:bg-gray-800" />
                </CardContent>
              </Card>
              <Card className={`${cardBg} ${cardBorder} shadow-sm relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 p-2 opacity-10 ${isDarkMode ? theme.colors.text : 'text-blue-500'}`}>
                  <Beef className="w-12 h-12" />
                </div>
                <CardContent className="p-4">
                  <p className={`${textSecondary} text-xs font-bold uppercase tracking-wider mb-1`}>Protein</p>
                  <div className="flex items-end space-x-1">
                    <h3 className={`text-2xl font-black ${textPrimary}`}>92g</h3>
                    <span className="text-gray-400 text-xs mb-1">/ 160g</span>
                  </div>
                  <Progress value={58} className="h-1.5 mt-3 bg-gray-200 dark:bg-gray-800" />
                </CardContent>
              </Card>
            </section>

            {/* Quick Actions */}
            <section className={`${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} rounded-3xl p-6 border ${cardBorder} shadow-xl relative overflow-hidden group`}>
              <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${theme.colors.gradient} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity`} />
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${theme.colors.gradient} flex items-center justify-center shadow-2xl shadow-blue-500/20`}>
                  <Camera className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className={`text-xl font-black italic ${textPrimary}`}>TALK TO YOUR FOOD</h2>
                  <p className={`${textSecondary} text-sm max-w-[240px]`}>Snap a pic and let your meal tell you its nutrient secrets!</p>
                </div>
                <Button 
                  onClick={handleScan}
                  className={`w-full py-6 rounded-2xl bg-gradient-to-r ${theme.colors.gradient} text-white font-black text-lg hover:scale-[1.02] transition-transform shadow-lg`}
                >
                  <Scan className="w-6 h-6 mr-2" />
                  START SCANNING
                </Button>
              </div>
            </section>

            {/* Water Tracker */}
            <section className={`${isDarkMode ? 'bg-blue-900/20 border-blue-500/20' : 'bg-blue-50 border-blue-100'} border rounded-2xl p-4`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <h4 className={`font-bold ${isDarkMode ? 'text-blue-100' : 'text-blue-900'}`}>Hydration</h4>
                </div>
                <span className="text-xs font-bold text-blue-500 tracking-widest uppercase">1.2L / 2.5L</span>
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {[1,2,3,4,5,6,7,8].map(i => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    size="icon" 
                    className={`w-10 h-10 rounded-xl flex-shrink-0 transition-all ${i <= 4 ? 'bg-blue-500 border-blue-400 text-white shadow-md' : (isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-500' : 'bg-white border-gray-200 text-gray-400')}`}
                  >
                    <Droplets className="w-5 h-5" />
                  </Button>
                ))}
              </div>
            </section>

            {/* Daily Streak */}
            <section className={`${cardBg} border ${cardBorder} rounded-2xl p-4 flex items-center justify-between`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-500 fill-orange-500" />
                </div>
                <div>
                  <h4 className={`font-bold ${textPrimary}`}>12 Day Streak</h4>
                  <p className={`${textSecondary} text-xs`}>You're on fire, Alex!</p>
                </div>
              </div>
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 ${isDarkMode ? 'border-gray-900' : 'border-white'} flex items-center justify-center text-[10px] font-bold ${i < 5 ? theme.colors.bg + ' text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {i}
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Logs */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className={`font-black text-lg italic uppercase tracking-wider ${textPrimary}`}>Recent Meals</h3>
                <Button variant="ghost" size="sm" className={isDarkMode ? theme.colors.text : 'text-sky-600'}>View All</Button>
              </div>
              <div className="space-y-3">
                {mealLogs.map(meal => (
                  <Card key={meal.id} className={`${cardBg} ${cardBorder} overflow-hidden group hover:border-sky-400 transition-colors`}>
                    <CardContent className="p-0 flex h-24">
                      <div className="w-24 h-full relative overflow-hidden">
                        <ImageWithFallback src={meal.image} alt={meal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${isDarkMode ? 'to-gray-900' : 'to-gray-50'}`} />
                      </div>
                      <div className="flex-1 p-3 flex flex-col justify-center">
                        <div className="flex justify-between items-start">
                          <h4 className={`font-bold text-sm ${textPrimary}`}>{meal.name}</h4>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">{meal.time}</span>
                        </div>
                        <div className="flex items-center space-x-3 mt-2">
                          <div className="flex items-center space-x-1">
                            <Flame className="w-3 h-3 text-orange-500" />
                            <span className={`text-xs font-bold ${textPrimary}`}>{meal.calories} kcal</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Beef className="w-3 h-3" />
                            <span className="text-[10px]">{meal.nutrients.protein}g</span>
                          </div>
                          <Badge variant="outline" className={`text-[8px] ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-400' : 'border-gray-200 bg-white text-gray-500'} uppercase tracking-tighter`}>
                            {meal.type}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="p-4 space-y-6">
            <header className="flex items-center justify-between">
              <h2 className={`text-2xl font-black italic uppercase tracking-tighter ${textPrimary}`}>Food Diary</h2>
              <div className={`flex items-center ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'} border rounded-xl p-1`}>
                <Button size="sm" variant="ghost" className="rounded-lg h-8 px-3">Today</Button>
                <Button size="sm" variant="ghost" className="rounded-lg h-8 px-3 text-gray-400">History</Button>
              </div>
            </header>

            <div className="space-y-6">
              {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(mealType => (
                <section key={mealType} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold flex items-center ${textPrimary}`}>
                      <div className={`w-2 h-6 ${theme.colors.bg} rounded-full mr-2`} />
                      {mealType}
                    </h3>
                    <Button size="icon" variant="outline" className={`w-8 h-8 rounded-full ${isDarkMode ? 'border-gray-800 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'} ${textPrimary}`}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {mealLogs.filter(m => m.type === mealType).length > 0 ? (
                    mealLogs.filter(m => m.type === mealType).map(meal => (
                      <Card key={meal.id} className={`${cardBg} ${cardBorder}`}>
                        <CardContent className="p-4 flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} flex-shrink-0">
                            <ImageWithFallback src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-bold text-sm ${textPrimary}`}>{meal.name}</h4>
                            <div className="flex items-center space-x-3 text-xs text-gray-400 mt-0.5">
                              <span>{meal.calories} kcal</span>
                              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                              <span>P: {meal.nutrients.protein}g</span>
                              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                              <span>C: {meal.nutrients.carbs}g</span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className={`${isDarkMode ? 'bg-gray-900/30' : 'bg-gray-50/50'} border border-dashed ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} rounded-2xl p-6 text-center`}>
                      <p className="text-gray-400 text-xs font-medium">No {mealType.toLowerCase()} logged yet</p>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="p-4 space-y-6">
            <header>
              <h2 className={`text-2xl font-black italic uppercase tracking-tighter ${textPrimary}`}>Bite Academy</h2>
              <p className={`${textSecondary} text-sm`}>Level up your nutrition knowledge</p>
            </header>

            <div className="relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r ${theme.colors.gradient} rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200`}></div>
              <Card className={`${cardBg} ${cardBorder} relative overflow-hidden rounded-3xl`}>
                <CardContent className="p-6 flex items-center space-x-6">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${theme.colors.gradient} flex items-center justify-center shadow-2xl`}>
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <Badge className={`${theme.colors.bg} text-white font-black text-[10px] mb-2`}>COOL COURSE</Badge>
                    <h3 className={`text-xl font-bold leading-tight mb-2 ${textPrimary}`}>How Veggies Give You Superpowers</h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 15 min</span>
                      <span className="flex items-center"><Award className="w-3 h-3 mr-1" /> 200 XP</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <section className="space-y-4">
              <h3 className="font-black text-sm uppercase tracking-widest text-gray-400">Learning Path</h3>
              <div className="space-y-4">
                {nutritionGuides.map(guide => (
                  <Card key={guide.id} className={`${cardBg} ${cardBorder} group hover:border-sky-400 transition-all cursor-pointer`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <h4 className={`font-bold ${textPrimary} group-hover:text-sky-500 transition-colors`}>{guide.title}</h4>
                          <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                            <span>{guide.category}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                            <span className={guide.difficulty === 'Beginner' ? 'text-green-500' : 'text-amber-500'}>{guide.difficulty}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>{guide.duration}</Badge>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className={theme.colors.text}>{guide.progress}%</span>
                          </div>
                          <Progress value={guide.progress} className={`h-1.5 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} ${theme.colors.bg}`} />
                        </div>
                        <Button size="icon" variant="ghost" className={`rounded-full w-10 h-10 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                          {guide.progress === 100 ? <CheckCircle className="text-green-500" /> : <PlayCircle className={theme.colors.text} />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className={`flex flex-col h-full ${appBg}`}>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6 py-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex max-w-[85%] space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Avatar className={`w-8 h-8 flex-shrink-0 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                        {msg.sender === 'user' ? (
                          <AvatarImage src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop" />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${theme.colors.gradient} flex items-center justify-center`}>
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <AvatarFallback>{msg.sender === 'user' ? 'U' : 'AI'}</AvatarFallback>
                      </Avatar>
                      <div className={`rounded-2xl p-4 shadow-sm ${
                        msg.sender === 'user' 
                          ? `bg-gradient-to-br ${theme.colors.gradient} text-white font-medium rounded-tr-none` 
                          : `${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-100'} text-gray-800 dark:text-gray-200 rounded-tl-none`
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className={`p-4 ${isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white/80 border-gray-100'} backdrop-blur-md border-t`}>
              <div className={`flex items-center space-x-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} rounded-2xl p-1.5 border`}>
                <Input 
                  placeholder="Ask your AI assistant..." 
                  className={`bg-transparent border-none focus-visible:ring-0 ${textPrimary} placeholder:text-gray-400 h-10`}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button 
                  size="icon" 
                  onClick={sendMessage}
                  className={`rounded-xl bg-gradient-to-r ${theme.colors.gradient} text-white hover:scale-105 transition-transform h-10 w-10 shadow-md`}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto ${navBg} backdrop-blur-xl border-t ${navBorder} z-40 pb-safe-area-inset-bottom h-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]`}>
        <div className="grid grid-cols-5 h-full">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'logs', icon: UtensilsCrossed, label: 'Logs' },
            { id: 'scan', icon: Scan, label: 'Scan', special: true },
            { id: 'nutrition', icon: Brain, label: 'Study' },
            { id: 'chat', icon: MessageCircle, label: 'Chat' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => item.special ? handleScan() : setActiveTab(item.id)}
              className="flex flex-col items-center justify-center relative group"
            >
              {item.special ? (
                <div className={`absolute -top-10 w-16 h-16 rounded-full bg-gradient-to-br ${theme.colors.gradient} flex items-center justify-center shadow-2xl shadow-blue-500/30 border-4 ${isDarkMode ? 'border-gray-950' : 'border-white'} scale-110 group-hover:scale-125 transition-transform duration-300`}>
                  <Camera className="text-white w-7 h-7" />
                </div>
              ) : (
                <>
                  <item.icon className={`w-6 h-6 mb-1 transition-colors ${activeTab === item.id ? (isDarkMode ? theme.colors.text : 'text-sky-500') : 'text-gray-400 group-hover:text-gray-300'}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-tighter ${activeTab === item.id ? (isDarkMode ? theme.colors.text : 'text-sky-500') : 'text-gray-400'}`}>{item.label}</span>
                  {activeTab === item.id && (
                    <motion.div layoutId="nav-glow" className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full ${theme.colors.bg} shadow-[0_0_10px_rgba(56,189,248,0.5)]`} />
                  )}
                </>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* AI Scanner / Talking Food Overlay */}
      <AnimatePresence>
        {showScanner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[60] ${isDarkMode ? 'bg-black' : 'bg-gray-50'} flex flex-col max-w-md mx-auto`}
          >
            {!analyzedFood ? (
              <div className="flex-1 relative flex flex-col items-center justify-center p-8">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeScanner}
                  className={`absolute top-4 right-4 ${isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'}`}
                >
                  <X className="w-8 h-8" />
                </Button>

                {isAnalyzing ? (
                  <div className="flex flex-col items-center space-y-8">
                    <div className="relative w-64 h-64">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className={`absolute inset-0 rounded-full border-4 border-dashed ${isDarkMode ? theme.colors.border : 'border-sky-400'} opacity-50`}
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`absolute inset-4 rounded-full bg-gradient-to-br ${theme.colors.gradient} flex items-center justify-center shadow-2xl`}
                      >
                        <Sparkles className="w-16 h-16 text-white" />
                      </motion.div>
                    </div>
                    <div className="text-center">
                      <h3 className={`text-2xl font-black italic tracking-tighter mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SEEING YOUR SNACK...</h3>
                      <p className="text-gray-400 text-sm font-medium">Consulting the Nutri-fy AI Assistant</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-12">
                    <div className="relative">
                      <div className={`w-64 h-80 border-4 ${isDarkMode ? 'border-white/20' : 'border-gray-200'} rounded-3xl relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
                        <Camera className={`w-20 h-20 ${isDarkMode ? 'text-white/10' : 'text-gray-100'}`} />
                        <div className={`absolute inset-0 border-2 border-dashed ${isDarkMode ? 'border-white/40' : 'border-gray-300'} m-4 rounded-2xl`} />
                        
                        {/* Scanning Bar */}
                        <motion.div 
                          animate={{ top: ['0%', '95%', '0%'] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className={`absolute left-0 right-0 h-1 bg-gradient-to-r ${theme.colors.gradient} shadow-[0_0_15px_rgba(56,189,248,1)] z-10`}
                        />
                      </div>
                      
                      {/* Corner Accents */}
                      <div className={`absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 ${isDarkMode ? theme.colors.border : 'border-sky-400'}`} />
                      <div className={`absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 ${isDarkMode ? theme.colors.border : 'border-sky-400'}`} />
                      <div className={`absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 ${isDarkMode ? theme.colors.border : 'border-sky-400'}`} />
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 ${isDarkMode ? theme.colors.border : 'border-sky-400'}`} />
                    </div>

                    <div className="space-y-4 w-full">
                      <Button 
                        onClick={handleCapture}
                        className={`w-full py-8 rounded-2xl bg-gradient-to-r ${theme.colors.gradient} text-white font-black text-xl hover:scale-[1.02] shadow-2xl transition-all`}
                      >
                        SNAP PHOTO
                      </Button>
                      <Button 
                        variant="outline"
                        className={`w-full py-4 ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-100 hover:bg-gray-700' : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'} font-bold rounded-2xl transition-colors`}
                      >
                        CHOOSE FROM GALLERY
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex-1 flex flex-col overflow-hidden ${isDarkMode ? 'bg-gray-950' : 'bg-white'}`}
              >
                {/* Close Button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeScanner}
                  className={`absolute top-4 right-4 z-50 ${isDarkMode ? 'text-white bg-black/50' : 'text-gray-900 bg-white/50'} backdrop-blur-md rounded-full shadow-lg`}
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Upper Section: The Food with Faces */}
                <div className="h-[45%] relative bg-black overflow-hidden group">
                  <ImageWithFallback src={analyzedFood.image} alt="Food" className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/20' : 'bg-transparent'}`} />
                  
                  {/* ANIMATED EYES */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-12">
                    {[1, 2].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl"
                      >
                        <motion.div 
                          animate={{ x: [-2, 2, -2], y: [-2, 2, -2] }}
                          transition={{ duration: 5, repeat: Infinity }}
                          className="w-4 h-4 bg-black rounded-full"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* ANIMATED MOUTH */}
                  <motion.div 
                    className="absolute top-[65%] left-1/2 -translate-x-1/2 w-12 h-4 bg-rose-500 rounded-full border-2 border-black shadow-xl"
                    animate={{ height: [4, 16, 4, 12, 4], scaleX: [1, 1.2, 1, 1.1, 1] }}
                    transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Speech Bubble */}
                  <motion.div 
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className={`absolute top-8 left-6 right-16 ${isDarkMode ? 'bg-white text-black' : 'bg-sky-500 text-white'} rounded-3xl p-4 shadow-2xl font-bold`}
                  >
                    <div className="relative">
                      <p className="text-sm italic leading-tight">
                        "{analyzedFood.content}"
                      </p>
                      <div className={`absolute -bottom-6 left-8 w-4 h-4 ${isDarkMode ? 'bg-white' : 'bg-sky-500'} rotate-45 transform`} />
                    </div>
                  </motion.div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">{analyzedFood.name}</h2>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-400 text-black font-black">HEALTHY SCORE: 92/100</Badge>
                    </div>
                  </div>
                </div>

                {/* Lower Section: Nutrients */}
                <ScrollArea className={`flex-1 ${isDarkMode ? 'bg-gray-950' : 'bg-white'} p-6`}>
                  <div className="space-y-8">
                    {/* Nutrient Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {analyzedFood.nutrients.map(nut => (
                        <div key={nut.label} className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'} border rounded-2xl p-4 flex flex-col space-y-2 shadow-sm`}>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{nut.label}</span>
                            <span className={`text-sm font-black ${textPrimary}`}>{nut.value}</span>
                          </div>
                          <Progress value={nut.percent} className={`h-1.5 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
                          <span className="text-[10px] text-gray-400 font-medium">Daily Value: {nut.percent}%</span>
                        </div>
                      ))}
                    </div>

                    {/* Fun Facts */}
                    <div className="space-y-4">
                      <h3 className={`font-black text-sm uppercase tracking-widest text-gray-400 flex items-center`}>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Did you know?
                      </h3>
                      <div className="space-y-2">
                        {analyzedFood.facts.map((fact, idx) => (
                          <div key={idx} className={`flex items-start space-x-3 ${isDarkMode ? 'bg-gray-900/40 border-gray-800/50' : 'bg-sky-50 border-sky-100'} p-3 rounded-xl border`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? theme.colors.bg : 'bg-sky-400'} mt-1.5`} />
                            <p className={`text-sm ${textSecondary}`}>{fact}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add Button */}
                    <div className="pt-4">
                      <Button 
                        onClick={() => {
                          const newMeal = {
                            id: Date.now(),
                            name: analyzedFood.name,
                            calories: analyzedFood.calories,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            type: 'Lunch',
                            nutrients: { protein: 18, carbs: 64, fat: 22 },
                            image: analyzedFood.image
                          };
                          setMealLogs([newMeal, ...mealLogs]);
                          closeScanner();
                          showSuccess(`${analyzedFood.name} logged successfully!`);
                        }}
                        className={`w-full py-7 rounded-2xl bg-gradient-to-r ${theme.colors.gradient} text-white font-black text-lg shadow-xl hover:scale-[1.02] transition-transform`}
                      >
                        LOG THIS MEAL
                      </Button>
                      <p className="text-center text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-widest">Powered by Nutri-fy AI Assistant</p>
                    </div>
                  </div>
                </ScrollArea>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
