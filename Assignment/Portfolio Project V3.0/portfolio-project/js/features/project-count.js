// project-render.js

function renderProject(dataToRender = projectsData) {
    const projectContainer = document.getElementById("projects-container");
    const countDisplay = document.getElementById("project-count"); // New reference

    if (!projectContainer) {
        console.log("Projects not found");
        return;
    }

    // 1. Update the visible count using the length of the array
    if (countDisplay) {
        countDisplay.textContent = `${dataToRender.length} projects found`;
    }

    projectContainer.innerHTML = "";

    // 2. Handle the "No projects found" case gracefully
    if (dataToRender.length === 0) {
        projectContainer.innerHTML = `<p class="col-span-full text-center py-10 text-gray-400 text-xl">No projects match your search.</p>`;
        return;
    }

    dataToRender.forEach(function (project) {
        // ... (Your existing card creation code)
        //
    });
}