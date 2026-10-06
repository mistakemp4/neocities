export interface Food {
	name: string;
	// made up, for the receipt
	price: number;
}

export const foods: { category: string; items: Food[] }[] = [
	{
		category: 'Drinks',
		items: [
			{ name: 'Earl Grey Tea', price: 3.5 },
			{ name: 'Oolong Milk Tea with Boba (50% sweet)', price: 6.25 },
			{ name: 'Dr Pepper', price: 2.49 },
			{ name: 'Ice Water (with straw)', price: 0.0 },
		],
	},
	{
		category: 'Snacks/Sides',
		items: [
			{ name: 'Enoki Mushrooms', price: 4.99 },
			{ name: 'Bell Peppers', price: 1.29 },
			{ name: 'Green Beans', price: 3.0 },
			{ name: 'Salt & Vinegar Chips', price: 2.29 },
		],
	},
	{
		category: 'Entrees & Main Dishes',
		items: [
			{ name: 'Spicy Tuna Hand Roll', price: 7.5 },
			{ name: 'Katsu Chicken', price: 13.99 },
			{ name: 'Tomato Soup', price: 5.49 },
			{ name: 'Minestrone Soup', price: 5.99 },
			{ name: 'Shin Black Ramen (with egg)', price: 4.5 },
			{ name: 'Steak', price: 35.49 },
			{ name: 'Pesto Pasta', price: 15.0 },
			{ name: 'Butter Chicken', price: 16.5 },
			{ name: 'Asada Burrito', price: 11.99 },
			{ name: 'Rare Beef Pho', price: 14.25 },
			{ name: 'Chirashi over Rice', price: 24.0 },
			{ name: 'Beef & Lamb Gyro', price: 12.5 },
			{ name: 'Otoro', price: 18.0 },
		],
	},
	{
		category: 'Desserts',
		items: [
			{ name: 'Tiramisu', price: 8.5 },
			{ name: 'Apple Pie', price: 4.75 },
			{ name: 'Crème Brûlée', price: 9.0 },
			{ name: 'Cookies & Cream Ice Cream', price: 3.99 },
			{ name: 'Red Bean Sesame Balls', price: 5.5 },
			{ name: 'Red Bean Taiyaki', price: 4.0 },
		],
	},
];
