export const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

export function renderPositions(onSelect) {
  const positionSection = document.getElementById("position-section");
  const ul = document.createElement("ul");
  ul.id = "position-list";
  ul.className = "flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 sm:ml-8 md:ml-16 lg:ml-32 text-base sm:text-lg md:text-xl lg:text-2xl leading-snug sm:leading-normal md:leading-7";

  positions.forEach((pos, index) => {
    const li = document.createElement("li");
    li.className = "cursor-pointer text-wipe";
    li.dataset.text = pos;
    li.textContent = pos;
    if (index === 0) li.classList.add("text-violet-600");
    li.onclick = () => {
      ul.querySelectorAll("li").forEach(item => item.classList.remove("text-violet-600"));
      li.classList.add("text-violet-600");
      onSelect(pos);
    };
    ul.appendChild(li);
  });

  positionSection.appendChild(ul);
}