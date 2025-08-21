import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Calculator, AlertTriangle, CheckCircle, Info, Users, User } from "lucide-react";
import { useState, useEffect } from "react";

// Validation types
type ValidationLevel = 'info' | 'warning' | 'error';
type ValidationMessage = {
  level: ValidationLevel;
  message: string;
  show: boolean;
};

type CalculatorMode = 'single' | 'team';

const ROICalculator = () => {
  const [mode, setMode] = useState<CalculatorMode>('single');
  const [monthlySalary, setMonthlySalary] = useState<number>(0);
  const [hoursAutomated, setHoursAutomated] = useState<number>(0);
  const [teamSize, setTeamSize] = useState<number>(1);
  const [annualSavings, setAnnualSavings] = useState<number>(0);
  const [adjustedSavings, setAdjustedSavings] = useState<number>(0);
  const [confidenceScore, setConfidenceScore] = useState<number>(5);
  const [showCTA, setShowCTA] = useState(false);
  const [perPersonCost, setPerPersonCost] = useState<number>(0); // Track per-person cost for team mode
  const [teamSizeManuallySet, setTeamSizeManuallySet] = useState(false); // Track if user manually changed team size
  
  // Validation states
  const [salaryValidation, setSalaryValidation] = useState<ValidationMessage>({ level: 'info', message: '', show: false });
  const [hoursValidation, setHoursValidation] = useState<ValidationMessage>({ level: 'info', message: '', show: false });

  // Dynamic constants based on mode
  const getValidationConstants = () => {
    if (mode === 'single') {
      return {
        MIN_SALARY: 5000,
        MIN_HOURS: 1,
        MAX_HOURS: 160,
        TOTAL_WORKING_HOURS: 176
      };
    } else {
      // For team mode, use flexible hours initially until user sets team size
      const maxTeamHours = teamSizeManuallySet ? teamSize * 160 : 2000; // High default until manually set
      return {
        MIN_SALARY: 10000,
        MIN_HOURS: 1,
        MAX_HOURS: maxTeamHours,
        TOTAL_WORKING_HOURS: 176 * Math.max(teamSize, 1)
      };
    }
  };

  const { MIN_SALARY, MIN_HOURS, MAX_HOURS, TOTAL_WORKING_HOURS } = getValidationConstants();

  // Mode-aware validation functions
  const validateSalary = (salary: number): ValidationMessage => {
    if (salary === 0) return { level: 'info', message: '', show: false };
    if (salary < MIN_SALARY) return { level: 'error', message: `Minimum ${mode === 'single' ? 'salary' : 'total cost'} should be ₹${MIN_SALARY.toLocaleString('en-IN')}`, show: true };
    
    if (mode === 'single') {
      if (salary < 15000) return { level: 'warning', message: 'This seems quite low for automation ROI', show: true };
      if (salary > 1000000) return { level: 'info', message: 'High salary - great automation potential!', show: true };
    } else {
      if (salary < 50000) return { level: 'warning', message: 'Low team cost - consider single employee mode', show: true };
      if (salary > 10000000) return { level: 'info', message: 'Very high team cost - excellent automation potential!', show: true };
    }
    
    return { level: 'info', message: `✓ ${mode === 'single' ? 'Salary' : 'Team cost'} looks reasonable`, show: true };
  };

  const validateHours = (hours: number): ValidationMessage => {
    if (hours === 0) return { level: 'info', message: '', show: false };
    if (hours < MIN_HOURS) return { level: 'error', message: `Minimum ${MIN_HOURS} hour per month`, show: true };
    
    // Only show specific cap error if team size is properly set
    if (hours > MAX_HOURS && teamSize > 1) {
      return { level: 'error', message: `Maximum ${teamSize * 160} hours/month (${teamSize} x 160h)`, show: true };
    } else if (hours > MAX_HOURS) {
      return { level: 'error', message: `This seems too high - please set team size first`, show: true };
    }
    
    if (mode === 'single') {
      if (hours > 120) return { level: 'warning', message: 'Very high automation - ensure this is realistic', show: true };
      if (hours > 80) return { level: 'warning', message: 'High automation hours - consider phased approach', show: true };
      if (hours < 20) return { level: 'info', message: 'Most businesses start with 20-60 hours/month', show: true };
    } else {
      const teamHoursThreshold = teamSize * 80; // 80 hours per person as high threshold
      if (hours > teamHoursThreshold) return { level: 'warning', message: `Very high team automation (${Math.round(hours/teamSize)}h per person) - consider phased rollout`, show: true };
      if (hours > teamSize * 40) return { level: 'warning', message: `High team automation (${Math.round(hours/teamSize)}h per person) - ensure realistic planning`, show: true };
      if (hours < teamSize * 25) return { level: 'info', message: `Teams typically automate 25-80 hours per person/month`, show: true };
    }
    
    return { level: 'info', message: '✓ Automation scope looks realistic', show: true };
  };

  // Calculate automation efficiency based on hours
  const getAutomationEfficiency = (hours: number): number => {
    if (hours <= 40) return 0.90; // Easy tasks - 90% efficiency
    if (hours <= 80) return 0.75; // Moderate complexity - 75% efficiency
    return 0.60; // Complex tasks - 60% efficiency
  };

  // Calculate confidence score (1-5)
  const calculateConfidence = (salary: number, hours: number): number => {
    let score = 5;
    
    // Reduce confidence for edge cases
    if (salary < 15000) score -= 1;
    if (hours > 100) score -= 1;
    if (hours > 120) score -= 1;
    if (salary < MIN_SALARY) score -= 2;
    if (hours < MIN_HOURS || hours > MAX_HOURS) score -= 2;
    
    return Math.max(1, score);
  };

  // Enhanced calculation logic
  const calculateROI = (salary: number, hours: number) => {
    if (salary === 0 || hours === 0) return { gross: 0, adjusted: 0 };
    
    // Basic calculation
    const hourlyRate = salary / (22 * 8);
    const monthlySavings = hours * hourlyRate;
    const grossAnnualSavings = monthlySavings * 12;
    
    // Apply automation efficiency
    const efficiency = getAutomationEfficiency(hours);
    const efficiencySavings = grossAnnualSavings * efficiency;
    
    // Apply implementation cost factor (20% for setup/maintenance)
    const implementationCostFactor = 0.80;
    const adjustedSavings = efficiencySavings * implementationCostFactor;
    
    // Cap at 85% of total role cost for realism
    const totalRoleCost = salary * 12;
    const maxSavings = totalRoleCost * 0.85;
    const finalSavings = Math.min(adjustedSavings, maxSavings);
    
    return { gross: grossAnnualSavings, adjusted: finalSavings };
  };

  // Handle input changes with validation
  const handleSalaryChange = (value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    setMonthlySalary(numValue);
    setSalaryValidation(validateSalary(numValue));
    
    // Update per-person cost for team mode
    if (mode === 'team' && numValue > 0 && teamSize > 0) {
      setPerPersonCost(numValue / teamSize);
    }
  };

  const handleHoursChange = (value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    setHoursAutomated(numValue);
    setHoursValidation(validateHours(numValue));
  };

  // Handle team size changes with automatic salary adjustment
  const handleTeamSizeChange = (newTeamSize: number) => {
    if (newTeamSize < 2) newTeamSize = 2;
    if (newTeamSize > 50) newTeamSize = 50;
    
    setTeamSize(newTeamSize);
    setTeamSizeManuallySet(true); // Mark as manually set
    
    // If we have a per-person cost established, adjust total salary
    if (mode === 'team' && perPersonCost > 0) {
      const newTotalSalary = perPersonCost * newTeamSize;
      setMonthlySalary(newTotalSalary);
      setSalaryValidation(validateSalary(newTotalSalary));
    }
    
    // Re-validate hours since MAX_HOURS depends on team size
    if (hoursAutomated > 0) {
      setHoursValidation(validateHours(hoursAutomated));
    }
  };

  // Handle mode changes
  const handleModeChange = (newMode: CalculatorMode) => {
    setMode(newMode);
    // Reset values when switching modes
    setMonthlySalary(0);
    setHoursAutomated(0);
    setTeamSize(newMode === 'team' ? 5 : 1);
    setPerPersonCost(0);
    setTeamSizeManuallySet(false); // Reset manual flag
    setSalaryValidation({ level: 'info', message: '', show: false });
    setHoursValidation({ level: 'info', message: '', show: false });
  };

  // Update calculations
  useEffect(() => {
    const { gross, adjusted } = calculateROI(monthlySalary, hoursAutomated);
    setAnnualSavings(gross);
    setAdjustedSavings(adjusted);
    setConfidenceScore(calculateConfidence(monthlySalary, hoursAutomated));
    
    // Show CTA for any positive savings with valid inputs
    const hasValidInputs = salaryValidation.level !== 'error' && hoursValidation.level !== 'error';
    const hasPositiveSavings = adjusted > 0;
    setShowCTA(hasValidInputs && hasPositiveSavings);
  }, [monthlySalary, hoursAutomated, salaryValidation.level, hoursValidation.level, mode]);

  // Helper functions for UI
  const getValidationIcon = (level: ValidationLevel) => {
    switch (level) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getValidationColor = (level: ValidationLevel) => {
    switch (level) {
      case 'error': return 'text-destructive';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
    }
  };

  const getInputBorderClass = (validation: ValidationMessage) => {
    if (!validation.show) return '';
    switch (validation.level) {
      case 'error': return 'border-destructive focus:border-destructive';
      case 'warning': return 'border-yellow-500 focus:border-yellow-500';
      case 'info': return 'border-green-500 focus:border-green-500';
    }
  };

  const automationPercentage = hoursAutomated > 0 ? Math.min((hoursAutomated / TOTAL_WORKING_HOURS) * 100, 100) : 0;

  // Format large numbers for better readability
  const formatLargeNumber = (amount: number): string => {
    if (amount >= 10000000) { // 1 crore+
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) { // 1 lakh+
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  // Get appropriate text size for savings amount
  const getSavingsTextSize = (amount: number): string => {
    const formatted = amount.toLocaleString('en-IN');
    if (formatted.length > 15) return 'text-xl sm:text-2xl';
    if (formatted.length > 12) return 'text-2xl sm:text-3xl';
    if (formatted.length > 8) return 'text-3xl sm:text-4xl';
    return 'text-4xl sm:text-5xl';
  };

  // Dynamic CTA messaging based on savings amount
  const getCTAMessage = (): { title: string; buttonText: string; buttonTextShort: string } => {
    if (adjustedSavings >= 50000000) { // 5 crore+
      return {
        title: "Massive automation potential - enterprise level ROI!",
        buttonText: "Book Executive Automation Strategy Session",
        buttonTextShort: "Book Executive Session"
      };
    } else if (adjustedSavings >= 10000000) { // 1 crore+
      return {
        title: "Outstanding automation potential identified!",
        buttonText: "Book Your Priority Automation Audit",
        buttonTextShort: "Book Priority Audit"
      };
    } else if (adjustedSavings >= 500000) {
      return {
        title: "Significant automation potential identified!",
        buttonText: "Book Your Priority Automation Audit",
        buttonTextShort: "Book Priority Audit"
      };
    } else if (adjustedSavings >= 200000) {
      return {
        title: "Strong ROI potential - let's explore this further!",
        buttonText: "Book Your Free Automation Audit", 
        buttonTextShort: "Book Free Audit"
      };
    } else if (adjustedSavings >= 100000) {
      return {
        title: "Good automation opportunity identified!",
        buttonText: "Explore Your Automation Options",
        buttonTextShort: "Explore Options"
      };
    } else if (adjustedSavings >= 50000) {
      return {
        title: "Every automation journey starts somewhere!",
        buttonText: "Discuss Your Automation Potential",
        buttonTextShort: "Discuss Potential"
      };
    } else {
      return {
        title: "Even small automations can make a difference!",
        buttonText: "Get Expert Automation Guidance",
        buttonTextShort: "Get Guidance"
      };
    }
  };

  return (
    <section className="py-section bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Calculator className="w-4 h-4" />
              Enhanced ROI Calculator
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Calculate Your Potential Savings</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Get realistic automation ROI with built-in validation</p>
          </div>

          <Card className="p-4 sm:p-6 lg:p-8 bg-card/80 backdrop-blur-sm overflow-hidden">
            {/* Mode Toggle */}
            <div className="mb-6 text-center">
              <div className="inline-flex p-1 bg-muted rounded-lg">
                <button
                  onClick={() => handleModeChange('single')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    mode === 'single' 
                      ? 'bg-background text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Single Employee
                </button>
                <button
                  onClick={() => handleModeChange('team')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    mode === 'team' 
                      ? 'bg-background text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Team / Department
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Salary/Cost Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="salary">
                    {mode === 'single' ? 'Monthly Salary (₹)' : 'Total Monthly Cost (₹)'}
                  </Label>
                  <Badge variant="outline" className="text-xs">
                    Min ₹{MIN_SALARY.toLocaleString('en-IN')}
                  </Badge>
                </div>
                <Input 
                  id="salary" 
                  type="number" 
                  min={MIN_SALARY}
                  value={monthlySalary || ''} 
                  onChange={e => handleSalaryChange(e.target.value)} 
                  placeholder={mode === 'single' ? "75000" : "500000"} 
                  className={`text-lg ${getInputBorderClass(salaryValidation)}`}
                />
                {salaryValidation.show && (
                  <div className={`flex items-center gap-2 text-sm ${getValidationColor(salaryValidation.level)}`}>
                    {getValidationIcon(salaryValidation.level)}
                    <span>{salaryValidation.message}</span>
                  </div>
                )}
                {monthlySalary > 0 && (
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>
                      {mode === 'single' 
                        ? `Hourly rate: ₹${Math.round(monthlySalary / (22 * 8)).toLocaleString('en-IN')}`
                        : `Average per person: ₹${Math.round(monthlySalary / teamSize).toLocaleString('en-IN')}/month`
                      }
                    </p>
                    {mode === 'team' && (
                      <div className="flex items-center gap-2">
                        <Label htmlFor="teamSize" className="text-xs">Team size:</Label>
                        <Input
                          id="teamSize"
                          type="number"
                          min={2}
                          max={50}
                          value={teamSize}
                          onChange={(e) => handleTeamSizeChange(Number(e.target.value) || 2)}
                          className="w-16 h-6 text-xs"
                        />
                        <span className="text-xs">people</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Hours Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hours">Hours Automated / Month</Label>
                  <Badge variant="outline" className="text-xs">
                    {mode === 'team' && teamSizeManuallySet ? `Max ${teamSize * 160}h` : mode === 'team' ? 'Flexible hours' : `Max ${MAX_HOURS}h`}
                  </Badge>
                </div>
                 <Input 
                  id="hours" 
                  type="number" 
                  min={MIN_HOURS}
                  max={MAX_HOURS}
                  value={hoursAutomated || ''} 
                  onChange={e => handleHoursChange(e.target.value)} 
                  placeholder={mode === 'single' ? "80" : "200"} 
                  className={`text-lg ${getInputBorderClass(hoursValidation)}`}
                />
                {hoursValidation.show && (
                  <div className={`flex items-center gap-2 text-sm ${getValidationColor(hoursValidation.level)}`}>
                    {getValidationIcon(hoursValidation.level)}
                    <span>{hoursValidation.message}</span>
                  </div>
                )}
                {hoursAutomated > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Automation Coverage</span>
                      <span>{automationPercentage.toFixed(1)}% of work time</span>
                    </div>
                    <Progress value={automationPercentage} className="h-2" />
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Results Section */}
            <div className="mt-8 space-y-4">
              {/* Calculation Breakdown */}
              {(monthlySalary > 0 && hoursAutomated > 0) && (
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-2">Basic Calculation</p>
                    <p className="text-muted-foreground break-words">{formatLargeNumber(annualSavings)} annually</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-2">Realistic Projection</p>
                    <p className="text-muted-foreground break-words">{formatLargeNumber(adjustedSavings)} annually</p>
                  </div>
                </div>
              )}

              {/* Main Results */}
              <div className="p-4 sm:p-6 bg-gradient-primary rounded-xl text-center overflow-hidden">
                <div className="text-white space-y-2">
                  <p className="text-base sm:text-lg font-medium">Estimated Annual Savings</p>
                  <div className="flex flex-col items-center gap-1 min-w-0">
                    <p className={`font-bold break-all ${getSavingsTextSize(adjustedSavings)} leading-tight`}>
                      {formatLargeNumber(adjustedSavings)}
                    </p>
                    {adjustedSavings >= 100000 && (
                      <p className="text-xs opacity-75 break-all px-2">
                        (₹{adjustedSavings.toLocaleString('en-IN')} exact)
                      </p>
                    )}
                  </div>
                  {adjustedSavings !== annualSavings && adjustedSavings > 0 && (
                    <p className="text-xs sm:text-sm opacity-90 px-2">
                      (Adjusted for efficiency: {Math.round(getAutomationEfficiency(hoursAutomated) * 100)}% & implementation costs)
                    </p>
                  )}
                  
                  {/* Confidence Score */}
                  {adjustedSavings > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm">Confidence:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <CheckCircle 
                              key={i} 
                              className={`w-4 h-4 ${i < confidenceScore ? 'text-white' : 'text-white/30'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm">({confidenceScore}/5)</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20 overflow-hidden">
              <div className="text-center space-y-3">
                <p className="font-semibold text-primary text-sm sm:text-base">
                  {showCTA ? getCTAMessage().title : 
                   salaryValidation.level === 'error' || hoursValidation.level === 'error' ? 
                   "Please fix the errors above" : 
                   "Enter your values to explore automation opportunities"}
                </p>
                <Button 
                  id="roicalculator-cta" 
                  variant="premium" 
                  className={`group transition-all duration-300 w-full max-w-sm mx-auto px-2 sm:px-4 py-3 text-xs sm:text-sm flex items-center justify-center gap-2 min-w-0 ${
                    showCTA ? 'opacity-100 transform scale-100' : 'opacity-50 blur-sm pointer-events-none'
                  } ${showCTA && 'animate-fade-in'}`} 
                  disabled={!showCTA}
                  onClick={() => {
                    // Scroll to lead form
                    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="truncate flex-1 text-center min-w-0">
                    {showCTA ? (
                      <>
                        <span className="sm:hidden">{getCTAMessage().buttonTextShort}</span>
                        <span className="hidden sm:inline">{getCTAMessage().buttonText}</span>
                      </>
                    ) : (
                      <>
                        <span className="sm:hidden">Complete inputs</span>
                        <span className="hidden sm:inline">Complete inputs to continue</span>
                      </>
                    )}
                  </span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Additional Information */}
            {adjustedSavings > 0 && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-sm space-y-2">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Calculation Details:</h4>
                  <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Efficiency factor: {Math.round(getAutomationEfficiency(hoursAutomated) * 100)}% (based on complexity)</li>
                    <li>• Implementation costs: 20% deducted for setup & maintenance</li>
                    <li>• Realistic cap: 85% of total role cost maximum</li>
                    <li>• Working days: 22 days/month, 8 hours/day</li>
                  </ul>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};
export default ROICalculator;