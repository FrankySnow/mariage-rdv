const createMap = function(){
	const lieux = [
		{
			latlng: L.latLng({
							lat : 46.264596051613154,
							lng : 6.157521486184124
			}),
			popup: `<b>Temple de Genthod</b><br>
							Route de Rennex 1,<br>
							1294 Genthod`,
		},
		{
			latlng: L.latLng({
							lat: 46.271358226150106, 
							lng: 6.120498418758872
			}),
			popup: `<b>Domaine du Château de Collex</b><br>
							Chemin des Chaumets 35<br>
							1239 Collex-Bossy<br>
							(parking à l'entrée du domaine)`,
		},
	]

	const bounds = L.latLngBounds(
		lieux.map( lieu => lieu.latlng )
	)

	const chemin = [
		{lat:46.26343191667125,lng:6.155157923649314},
		{lat:46.262883032751674,lng:6.156150340984824},
		{lat:46.263198270809646,lng:6.156558036755088},
		{lat:46.26358397137964,lng:6.156826257656577},
		{lat:46.263869536399504,lng:6.157046198795798},
		{lat:46.26457417099402,lng:6.15748071665621},
	]

	const map = L.map('map').fitBounds(bounds)

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

	lieux.forEach( lieu =>
		L.marker(lieu.latlng).bindPopup(lieu.popup).addTo(map)
	)

	const polyline = L.polyline(chemin,{dashArray:'5,5'}).addTo(map)
	polyline.bindTooltip('5 min à pied')

	const icon = L.icon({
		iconUrl: 'img/parking.jpg',
		iconSize: [20,20]
	})
	L.marker(chemin[0],{icon:icon}).bindTooltip(`parking au chemin de la Gandole`).addTo(map)
}

const timer = (time) =>
  new Promise( 
    resolve => setTimeout(resolve, time)
  )

const textComponent = Vue.component('t',{
	template: `<span v-html=text><slot></slot></span>`,
	props: ['text'],
})

const vm = new Vue({
	el: '#root',
	data: {
		langues : {
			it : {
				"1" : "Dato che a poco a poco abbiamo costruito il nostro nido, è il momento di prendere la nostra migliore penna per annunciarvi la nostra unione che si terrà <span class=emphase>sabato 24 giugno 2017 presso il tempio di Genthod alle ore 15.</span>",
				"2" : "Alla fine della cerimonia, le nostre famiglie e noi avremo il piacere di ricevervi per un cocktail seguito da un pranzo al <q>domaine du château de Collex</q>.",
				"3" : "Non che te ne chiediamo uno! Ma se ne hai voglia... e che vuoi aiutarci a sistemare il nostro piccolo nido, eccola :",
				"4" : "La nostra lista di nozze",
				"5" : "Oppure, se lo preferisci, ecco i dettagli del nostro nuovo conto congiunto:",
				"6" : "Per ritrovarci",
				"7" : "Per farci un regalo",
			},
			fr : {
				"1" : "Puisque petit à petit nous avons construit notre nid, il est temps de prendre notre plus belle plume afin de vous annoncer notre union qui aura lieu <span class=emphase>le samedi 24 juin 2017 au Temple de Genthod à 15h.</span>",
				"2" : "À l’issue de la cérémonie, nos familles et nous aurons le plaisir de vous recevoir pour un cocktail ainsi qu’un repas au domaine du château de Collex.",    
				"3" : "Non pas que nous vous en demandions un ! Mais si l'envie vous en prenait... et que vous souhaitiez contribuer à nous aider à aménager notre petit nid douillet, la voici :",
				"4" : "Notre liste de mariage",
				"5" : "Ou si vous le préférez, voici les coordonnées de notre nouveau compte commun :",
				"6" : "Nous retrouver",
				"7" : "Nous faire un cadeau"
			},
		},
		langueActuelle: 'fr',
		isTranslating: false,
	},
	mounted(){
		createMap()
	},
	methods: {
		traduire(langue){
			this.isTranslating = true
			timer(1000).then( () =>	{
				this.langueActuelle = langue
				this.isTranslating = false
			} )
		}
	},
	computed: {
		lang() {
			return this.langues[this.langueActuelle]
		}
	}
})