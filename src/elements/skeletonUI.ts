const movieContainer = document.getElementById('movie-list')!;

export function loadSkeletonUI(count: number) {
  for (let i = 0; i < count; i++) {
    const skeletonElement = document.createElement('li');
    skeletonElement.classList.add('movie', 'skeleton');

    skeletonElement.innerHTML = `
      <div class="skeleton-image"></div>
      <div class="skeleton-title"></div>
      <div class="skeleton-rate"></div>
    `;

    movieContainer.appendChild(skeletonElement);
  }
}

export function clearSkeleton() {
  const skeletons = document.querySelectorAll('.skeleton');
  skeletons.forEach((skeleton) => skeleton.remove());
}
