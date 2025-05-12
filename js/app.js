const feedWrapper = document.querySelector(".feedback-wrapper");
const select1 = document.querySelector("#filter-sort");
const select2 = document.querySelector("#filter-page");
const btn = document.querySelector("#search");
const counter = document.querySelector("#feedback-counter");




async function test() {
	const res = await fetch(
		`http://51.38.232.174:3002/v1/feedbacks?sort=${select1.value}&pageSize=${select2.value}`,
		{
			method: "GET",
		}
	);
	let data = await res.json();

	return data;
}

/*d'abbord je prend les value de mes 2 input, je dois ensuite fetch avec ses 2 value et ensuite je stock mon fetch dans un tableau (genre data.tab[]), et donc ensuite je reste avec le bouton et j'utilise le tableau pour compléter mon html via js).*/

document.addEventListener("DOMContentLoaded", async () => {
	const data = await test();

	console.log(data);

	counter.textContent = data.length;
	for (let i = 0; i < data.length; i++) {
		const item = document.createElement("div");
		item.classList.add("feedback-item");

		item.innerHTML = `
                    <div class="feedback-item-votes">
						<svg viewBox="0 0 24 24">
							<path
								d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
								style="fill: currentcolor"
							></path>
						</svg>
						<span class="text-regular-3">${data[i].votes}</span>
					</div>
					<div class="feedback-item-text">
						<h3 class="heading-3">${data[i].title}</h3>
						<p>${data[i].description}</p>
						<div class="feedback-chip text-regular-3">${data[i].category}</div>
					</div>
					<div class="feedback-item-comments">
						<svg class="grey-lighten-1-text" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3Z"
							></path>
						</svg>
						<span class="bold">${data[i].comments}</span>
					</div>
        `;

		feedWrapper.appendChild(item);
	}
});
