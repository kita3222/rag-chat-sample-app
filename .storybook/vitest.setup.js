const { beforeAll } = require("vitest");
const { setProjectAnnotations } = require("@storybook/testing-library");
const projectAnnotations = require("./preview");

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([projectAnnotations]);

beforeAll(project.beforeAll);
