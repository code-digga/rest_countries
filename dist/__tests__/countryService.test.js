"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const countryService_1 = require("../services/countryService");
describe('Country Service', () => {
    test('should fetch country data', () => __awaiter(void 0, void 0, void 0, function* () {
        const countryData = yield (0, countryService_1.fetchCountryByName)('USA');
        expect(countryData).toBeDefined();
        expect(countryData[0].name.common).toBe('United States');
    }));
});
