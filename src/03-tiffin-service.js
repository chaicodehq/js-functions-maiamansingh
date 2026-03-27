/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  const prices = {
    veg: 80,
    nonveg: 120,
    jain: 90,
  };

  if (typeof name !== "string" || name.trim() === "") {
    return null;
  }

  if (!(mealType in prices)) {
    return null;
  }

  const d = Number(days);
  if (!Number.isFinite(d) || d <= 0) {
    return null;
  }

  const dailyRate = prices[mealType];
  const totalCost = dailyRate * d;

  return {
    name,
    mealType,
    days: d,
    dailyRate,
    totalCost,
  };
}

export function combinePlans(...plans) {
  if (!plans.length) {
    return null;
  }

  const validPlans = plans.filter(
    (p) =>
      p &&
      typeof p === "object" &&
      typeof p.name === "string" &&
      typeof p.mealType === "string"
  );

  const totalCustomers = validPlans.length;
  let totalRevenue = 0;
  const mealBreakdown = {};

  for (const plan of validPlans) {
    const cost = Number(plan.totalCost);
    if (Number.isFinite(cost)) {
      totalRevenue += cost;
    }
    const type = plan.mealType;
    mealBreakdown[type] = (mealBreakdown[type] || 0) + 1;
  }

  return {
    totalCustomers,
    totalRevenue,
    mealBreakdown,
  };
}

export function applyAddons(plan, ...addons) {
  if (!plan || typeof plan !== "object") {
    return null;
  }

  const addonNames = [];
  let extraPerDay = 0;

  for (const addon of addons) {
    if (
      addon &&
      typeof addon.name === "string" &&
      typeof addon.price === "number"
    ) {
      addonNames.push(addon.name);
      extraPerDay += addon.price;
    }
  }

  const days = Number(plan.days);
  const baseDailyRate = Number(plan.dailyRate);
  const newDailyRate =
    (Number.isFinite(baseDailyRate) ? baseDailyRate : 0) + extraPerDay;
  const totalCost =
    Number.isFinite(days) && days > 0 ? newDailyRate * days : newDailyRate;

  return {
    ...plan,
    dailyRate: newDailyRate,
    totalCost,
    addonNames,
  };
}