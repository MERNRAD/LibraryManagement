
const User = require("../models/user");

describe("Pruebas unitarias del modelo User", () => {
    test("TU-01: genera un hash y un salt para la contrasena", () => {
        const user = new User();

        user.setPassword("ClaveSegura123");

        expect(user.salt).toBeDefined();
        expect(user.hash).toBeDefined();
        expect(user.hash).not.toBe("ClaveSegura123");
    });

    test("TU-02: valida una contrasena correcta", () => {
        const user = new User();

        user.setPassword("ClaveSegura123");

        expect(user.isValidPassword("ClaveSegura123")).toBe(true);
    });

    test("TU-03: rechaza una contrasena incorrecta", () => {
        const user = new User();

        user.setPassword("ClaveSegura123");

        expect(user.isValidPassword("ClaveIncorrecta")).toBe(false);
    });

    test("TU-04: genera salts diferentes para dos usuarios", () => {
        const firstUser = new User();
        const secondUser = new User();

        firstUser.setPassword("ClaveSegura123");
        secondUser.setPassword("ClaveSegura123");

        expect(firstUser.salt).not.toBe(secondUser.salt);
        expect(firstUser.hash).not.toBe(secondUser.hash);
    });

    test("TU-05: rechaza una contrasena con mayusculas diferentes", () => {
        const user = new User();

        user.setPassword("ClaveSegura123");

        expect(user.isValidPassword("clavesegura123")).toBe(false);
    });

    test("TU-06: valida repetidamente la misma contrasena", () => {
        const user = new User();

        user.setPassword("ClaveSegura123");

        expect(user.isValidPassword("ClaveSegura123")).toBe(true);
        expect(user.isValidPassword("ClaveSegura123")).toBe(true);
        expect(user.isValidPassword("ClaveSegura123")).toBe(true);
    });

    test("TU-07: genera hashes diferentes para contrasenas distintas", () => {
        const firstUser = new User();
        const secondUser = new User();

        firstUser.setPassword("ClaveSegura123");
        secondUser.setPassword("OtraClave456");

        expect(firstUser.hash).not.toBe(secondUser.hash);
        expect(firstUser.isValidPassword("ClaveSegura123")).toBe(true);
        expect(secondUser.isValidPassword("OtraClave456")).toBe(true);
    });

    test("TU-08: actualiza la contrasena y rechaza la anterior", () => {
        const user = new User();

        user.setPassword("ClaveSegura123");

        const previousHash = user.hash;

        user.setPassword("NuevaClave456");

        expect(user.hash).not.toBe(previousHash);
        expect(user.isValidPassword("NuevaClave456")).toBe(true);
        expect(user.isValidPassword("ClaveSegura123")).toBe(false);
    });

});
