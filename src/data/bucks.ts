export interface Player {
	name: string;
	position: string;
	age?: number;
	heightCm?: number | null;
	weightKg?: number | null;
	number?: number | string | null;
	college?: string | null;
	salary?: string | null;
	bio?: string;
}

export interface Game {
	rival: string;
	date: string;
	arena: string;
	note: string;
}

export interface Stat {
	label: string;
	value: string;
	detail?: string;
}

export interface Highlight {
	title: string;
	copy: string;
	tag: string;
}

const BUCKS_ID = 17;
const SEASON = 2025;
const API_KEY = import.meta.env.BALLDONTLIE_API_KEY;
const API_BASE = 'https://api.balldontlie.io/v1';
const AUTH_HEADERS = API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {};

export const fallbackPlayers: Player[] = [
	{
		name: 'Alex Antetokounmpo',
		position: 'F',
		age: 24,
		heightCm: 203,
		weightKg: 97,
		number: 29,
		college: '--',
		salary: '--',
		bio: 'Ala fisico, corta sin pelota y corre la cancha.'
	},
	{
		name: 'Giannis Antetokounmpo',
		position: 'F',
		age: 31,
		heightCm: 211,
		weightKg: 110,
		number: 34,
		college: '--',
		salary: '$54,126,450',
		bio: 'MVP, motor de transicion y ancla defensiva.'
	},
	{
		name: 'Thanasis Antetokounmpo',
		position: 'F',
		age: 33,
		heightCm: 201,
		weightKg: 99,
		number: 43,
		college: '--',
		salary: '$2,296,274',
		bio: 'Energia pura, presion defensiva y intensidad de vestuario.'
	},
	{
		name: 'Ousmane Dieng',
		position: 'F',
		age: 22,
		heightCm: 206,
		weightKg: 84,
		number: 21,
		college: '--',
		salary: '$6,670,882',
		bio: 'Ala largo con manejo, cambia marcas y juega desde el drible.'
	},
	{
		name: 'AJ Green',
		position: 'G',
		age: 26,
		heightCm: 193,
		weightKg: 86,
		number: 20,
		college: 'Northern Iowa',
		salary: '$2,301,587',
		bio: 'Especialista catch-and-shoot, spacing directo para la segunda unidad.'
	},
	{
		name: 'Gary Harris',
		position: 'G',
		age: 31,
		heightCm: 193,
		weightKg: 95,
		number: 11,
		college: 'Michigan State',
		salary: '$3,634,153',
		bio: 'Veterano 3&D que ordena posesiones y niega lineas de pase.'
	},
	{
		name: 'Andre Jackson Jr.',
		position: 'G',
		age: 24,
		heightCm: 198,
		weightKg: 95,
		number: 44,
		college: 'UConn',
		salary: '$2,221,677',
		bio: 'Playmaker secundario, defensor multiposicional y gran energia.'
	},
	{
		name: 'Kyle Kuzma',
		position: 'F',
		age: 30,
		heightCm: 203,
		weightKg: 100,
		number: 18,
		college: 'Utah',
		salary: '$21,810,605',
		bio: 'Ala anotador que castiga closeouts y produce desde el poste alto.'
	},
	{
		name: 'Pete Nance',
		position: 'F',
		age: 26,
		heightCm: 206,
		weightKg: 102,
		number: 35,
		college: 'North Carolina',
		salary: '--',
		bio: 'Stretch four con pase extra y juego sin apuro.'
	},
	{
		name: 'Kevin Porter Jr.',
		position: 'G',
		age: 25,
		heightCm: 196,
		weightKg: 92,
		number: 7,
		college: 'USC',
		salary: '$5,134,000',
		bio: 'Shot creator con ventaja en uno contra uno y pick-and-roll.'
	},
	{
		name: 'Bobby Portis',
		position: 'F/C',
		age: 31,
		heightCm: 206,
		weightKg: 113,
		number: 9,
		college: 'Arkansas',
		salary: '$13,580,247',
		bio: 'Rebote ofensivo, juego interior y tiro desde la media distancia.'
	},
	{
		name: 'Taurean Prince',
		position: 'F',
		age: 31,
		heightCm: 198,
		weightKg: 99,
		number: 12,
		college: 'Baylor',
		salary: '$3,303,774',
		bio: 'Ala 3&D confiable, sostiene emparejamientos fisicos.'
	},
	{
		name: 'Ryan Rollins',
		position: 'G',
		age: 23,
		heightCm: 191,
		weightKg: 82,
		number: 13,
		college: 'Toledo',
		salary: '$4,000,000',
		bio: 'Combo guard con flotadora, pull-up y buen ritmo en media cancha.'
	},
	{
		name: 'Cormac Ryan',
		position: 'G',
		age: 27,
		heightCm: 196,
		weightKg: 88,
		number: 30,
		college: 'North Carolina',
		salary: '--',
		bio: 'Perimetral ordenado, toma buenas decisiones y cierra fuerte.'
	},
	{
		name: 'Jericho Sims',
		position: 'C',
		age: 27,
		heightCm: 208,
		weightKg: 113,
		number: '00',
		college: 'Texas',
		salary: '$2,461,463',
		bio: 'Vertical spacer, amenaza lob y presencia atletica cerca del aro.'
	},
	{
		name: 'Cam Thomas',
		position: 'G',
		age: 24,
		heightCm: 191,
		weightKg: 95,
		number: 24,
		college: 'LSU',
		salary: '$844,607',
		bio: 'Microondas anotador, vive del uno contra uno y del pull-up.'
	},
	{
		name: 'Gary Trent Jr.',
		position: 'G',
		age: 27,
		heightCm: 196,
		weightKg: 93,
		number: 5,
		college: 'Duke',
		salary: '$3,697,105',
		bio: '3&D agresivo, gran timing para puntear lineas de pase.'
	},
	{
		name: 'Myles Turner',
		position: 'C',
		age: 29,
		heightCm: 211,
		weightKg: 113,
		number: 3,
		college: 'Texas',
		salary: '$25,318,251',
		bio: 'Rim protector elite y amenaza pick-and-pop en cinco abierto.'
	}
];

export const fallbackSchedule: Game[] = [
	{ rival: 'Miami Heat', date: '15 MAR', arena: 'Fiserv Forum', note: 'Duelo del Este tras el All-Star break.' },
	{ rival: 'Cleveland Cavaliers', date: '18 MAR', arena: 'Fiserv Forum', note: 'Juego fisico para medir la rotacion interior.' },
	{ rival: 'Philadelphia 76ers', date: '21 MAR', arena: 'Wells Fargo Center', note: 'Salida compleja por siembra y ritmo.' },
	{ rival: 'Boston Celtics', date: '24 MAR', arena: 'TD Garden', note: 'Cruce de maxima exigencia en el Este.' },
	{ rival: 'Chicago Bulls', date: '27 MAR', arena: 'United Center', note: 'Clasico divisional con foco en la segunda unidad.' },
	{ rival: 'New York Knicks', date: '30 MAR', arena: 'Madison Square Garden', note: 'Cierre de mes en un entorno de playoff.' }
];

export const fallbackStats: Stat[] = [
	{ label: 'Record 25-26', value: '27-39', detail: 'Situacion al 15 de marzo' },
	{ label: 'Conferencia', value: '11o Este', detail: 'Zona fuera de playoffs' },
	{ label: 'Triple', value: '38.5% 3PT', detail: 'El tiro sostiene el spacing' },
	{ label: 'Ofensiva', value: '110 ORTG', detail: 'Produccion irregular en media cancha' }
];

export const highlights: Highlight[] = [
	{
		title: 'Drop coverage + longitud',
		copy: 'Los internos protegen el aro mientras las alas niegan lineas de pase y cargan la ayuda temprana.',
		tag: 'Sistema defensivo'
	},
	{
		title: 'Pick and roll con gravedad',
		copy: 'La media cancha busca liberar a los guards para tiros tras drible o descargar hacia el roller.',
		tag: 'Ataque'
	},
	{
		title: 'Fear the Deer',
		copy: 'El discurso visual del equipo mezcla potencia, trabajo fisico y una identidad muy reconocible.',
		tag: 'Identidad'
	}
];

const safeFetch = async (url: string) => {
	if (!API_KEY) return null;

	try {
		const response = await fetch(url, { headers: AUTH_HEADERS });
		if (!response.ok) {
			throw new Error(`status ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error('API fetch fallo', url, error);
		return null;
	}
};

export const getBucksData = async () => {
	const rosterResponse = await safeFetch(`${API_BASE}/players?team_ids[]=${BUCKS_ID}&per_page=100`);
	const scheduleResponse = await safeFetch(
		`${API_BASE}/games?team_ids[]=${BUCKS_ID}&seasons[]=${SEASON}&per_page=100`
	);

	const players: Player[] =
		rosterResponse?.data?.map((player: any) => {
			const heightCm =
				player.height_feet && player.height_inches
					? Math.round((player.height_feet * 12 + player.height_inches) * 2.54)
					: null;
			const weightKg = player.weight_pounds ? Math.round(player.weight_pounds / 2.205) : null;

			return {
				name: `${player.first_name} ${player.last_name}`,
				position: player.position || 'N/A',
				heightCm,
				weightKg,
				number: player.jersey_number ?? '-',
				college: player.college || 'NBA',
				bio: 'Dato importado desde la API balldontlie.'
			};
		}) ?? fallbackPlayers;

	const schedule: Game[] =
		scheduleResponse?.data
			?.filter((game: any) => new Date(game.date) >= new Date('2026-03-15T00:00:00Z'))
			?.slice(0, 6)
			?.map((game: any) => {
				const dateObj = new Date(game.date);
				const isHome = game.home_team?.id === BUCKS_ID;
				return {
					rival: isHome ? game.visitor_team?.full_name : game.home_team?.full_name,
					date: dateObj.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }).toUpperCase(),
					arena: isHome ? 'Fiserv Forum' : game.home_team?.full_name ?? 'Visita',
					note: game.status || 'Temporada regular'
				};
			}) ?? fallbackSchedule;

	const positions = Array.from(new Set(players.map((player) => player.position || 'N/A')));

	return {
		players,
		positions,
		schedule,
		stats: fallbackStats,
		highlights
	};
};
