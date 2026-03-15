function mergeSettings(savedSettingsJSON, defaultSettings) {

    const savedSettings = JSON.parse(savedSettingsJSON);

    const merged = {
        ...defaultSettings,
        ...savedSettings
    };

    const mergedJSON = JSON.stringify(merged);

    return {
        mergedObject: merged,
        mergedJSON: mergedJSON
    };
}

const defaultSettings = {
    theme: "light",
    notifications: true,
    fontSize: 14
};

const savedSettingsJSON = '{"theme":"dark","fontSize":16}';

const result = mergeSettings(savedSettingsJSON, defaultSettings);

console.log(result.mergedObject);
console.log(result.mergedJSON);