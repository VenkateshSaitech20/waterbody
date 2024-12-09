import { utils, write } from 'xlsx';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function POST(req) {
    try {
        const { fileType } = await req.json();
        const queryFilter = {
            AND: [
                { isDeleted: 'N' },
            ]
        };
        if (fileType === "users") {
            const worksheetData = [
                ['name', 'email', 'password', 'contactNo', 'country', 'companyName']
            ];
            const worksheet = utils.aoa_to_sheet(worksheetData);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, 'Users');
            const excelBuffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });
            return new Response(excelBuffer, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="users.xlsx"'
                }
            });
        } else if (fileType === "countries") {
            const countries = await prisma.country.findMany({
                where: queryFilter,
                select: {
                    id: true,
                    name: true,
                    shortname: true,
                    phoneCode: true,
                }
            });
            const worksheetData = [
                ['id', 'name', 'shortname', 'phoneCode'],
                ...countries.map(country => [
                    country.id,
                    country.name,
                    country.shortname,
                    country.phoneCode
                ])
            ];
            const worksheet = utils.aoa_to_sheet(worksheetData);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, 'Countries');
            const excelBuffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });
            return new Response(excelBuffer, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="countries.xlsx"'
                }
            });
        } else if (fileType === "states") {
            const states = await prisma.state.findMany({
                where: queryFilter,
                select: {
                    id: true,
                    lgdCode: true,
                    name: true,
                    countryId: true,
                    country: true,
                }
            });
            const worksheetData = [
                ['id', 'lgdCode', 'name', 'countryId', 'country'],
                ...states.map(state => [
                    state.id,
                    state.lgdCode,
                    state.name,
                    state.countryId,
                    state.country,
                ])
            ];
            const worksheet = utils.aoa_to_sheet(worksheetData);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, 'States');
            const excelBuffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });
            return new Response(excelBuffer, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="states.xlsx"'
                }
            });
        } else if (fileType === "districts") {
            const cities = await prisma.city.findMany({
                where: queryFilter,
                select: {
                    id: true,
                    name: true,
                    countryId: true,
                    country: true,
                    stateId: true,
                    state: true,
                }
            });
            const worksheetData = [
                ['id', 'name', 'lgdCode', 'shortname', 'countryId', 'country', 'stateId', 'state'],
                ...cities.map(city => [
                    city.id,
                    city.name,
                    city.countryId,
                    city.country,
                    city.stateId,
                    city.state
                ])
            ];
            const worksheet = utils.aoa_to_sheet(worksheetData);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, 'Cities');
            const excelBuffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });
            return new Response(excelBuffer, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="cities.xlsx"'
                }
            });
        } else if (fileType === "taluks") {
            const taluks = await prisma.taluks.findMany({
                where: queryFilter,
                select: {
                    id: true,
                    name: true,
                    lgdCode: true,
                    countryId: true,
                    country: true,
                    stateId: true,
                    state: true,
                    district: true,
                    districtId: true
                }
            });
            const worksheetData = [
                ['id', 'name', 'lgdCode', 'countryId', 'country', 'stateId', 'state', 'district', 'districtId'],
                ...taluks.map(taluk => [
                    taluk.id,
                    taluk.name,
                    taluk.lgdCode,
                    taluk.countryId,
                    taluk.country,
                    taluk.stateId,
                    taluk.state,
                    taluk.district,
                    taluk.districtId
                ])
            ];
            const worksheet = utils.aoa_to_sheet(worksheetData);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, 'Taluks');
            const excelBuffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });
            return new Response(excelBuffer, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="taluks.xlsx"'
                }
            });
        } else if (fileType === "blocks") {
            const blocks = await prisma.block.findMany({
                where: queryFilter,
                select: {
                    id: true,
                    name: true,
                    lgdCode: true,
                    countryId: true,
                    country: true,
                    stateId: true,
                    state: true,
                    district: true,
                    districtId: true,
                    taluk: true,
                    talukId: true
                }
            });
            const worksheetData = [
                ['id', 'name', 'lgdCode', 'countryId', 'country', 'stateId', 'state', 'district', 'districtId', 'taluk', 'talukId'],
                ...blocks.map(block => [
                    block.id,
                    block.name,
                    block.lgdCode,
                    block.countryId,
                    block.country,
                    block.stateId,
                    block.state,
                    block.district,
                    block.districtId,
                    block.taluk,
                    block.talukId
                ])
            ];
            const worksheet = utils.aoa_to_sheet(worksheetData);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, 'Blocks');
            const excelBuffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });
            return new Response(excelBuffer, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="blocks.xlsx"'
                }
            });
        } else if (fileType === "panchayats") {
            const panchayats = await prisma.panchayats.findMany({
                where: queryFilter,
                select: {
                    id: true,
                    name: true,
                    lgdCode: true,
                    countryId: true,
                    country: true,
                    stateId: true,
                    state: true,
                    district: true,
                    districtId: true,
                    taluk: true,
                    talukId: true,
                    block: true,
                    blockId: true
                }
            });
            const worksheetData = [
                ['id', 'name', 'lgdCode', 'countryId', 'country', 'stateId', 'state', 'district', 'districtId', 'taluk', 'talukId', 'block', 'blockId'],
                ...panchayats.map(panchayat => [
                    panchayat.id,
                    panchayat.name,
                    panchayat.lgdCode,
                    panchayat.countryId,
                    panchayat.country,
                    panchayat.stateId,
                    panchayat.state,
                    panchayat.district,
                    panchayat.districtId,
                    panchayat.taluk,
                    panchayat.talukId,
                    panchayat.block,
                    panchayat.blockId
                ])
            ];
            const worksheet = utils.aoa_to_sheet(worksheetData);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, 'Panchayats');
            const excelBuffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });
            return new Response(excelBuffer, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="panchayats.xlsx"'
                }
            });
        } else if (fileType === "habitations") {
            const habitations = await prisma.habitations.findMany({
                where: queryFilter,
                select: {
                    id: true,
                    name: true,
                    lgdCode: true,
                    countryId: true,
                    country: true,
                    stateId: true,
                    state: true,
                    district: true,
                    districtId: true,
                    taluk: true,
                    talukId: true,
                    block: true,
                    blockId: true,
                    panchayat: true,
                    panchayatId: true
                }
            });
            const worksheetData = [
                ['id', 'name', 'lgdCode', 'countryId', 'country', 'stateId', 'state', 'district', 'districtId', 'taluk', 'talukId', 'block', 'blockId', 'panchayat', 'panchayatId'],
                ...habitations.map(habitation => [
                    habitation.id,
                    habitation.name,
                    habitation.lgdCode,
                    habitation.countryId,
                    habitation.country,
                    habitation.stateId,
                    habitation.state,
                    habitation.district,
                    habitation.districtId,
                    habitation.taluk,
                    habitation.talukId,
                    habitation.block,
                    habitation.blockId,
                    habitation.panchayat,
                    habitation.panchayatId
                ])
            ];
            const worksheet = utils.aoa_to_sheet(worksheetData);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, 'Habitations');
            const excelBuffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });
            return new Response(excelBuffer, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="habitations.xlsx"'
                }
            });
        } else if (fileType === "urbanlocalbodies") {
            const ulbs = await prisma.urban_local_bodies.findMany({
                where: queryFilter,
                select: {
                    id: true,
                    name: true,
                    ward: true,
                    wardCode: true,
                    jurisdictionId: true,
                    jurisdiction: true,
                }
            });
            const worksheetData = [
                ['id', 'name', 'ward', 'wardCode', 'jurisdictionId', 'jurisdiction'],
                ...ulbs.map(ulb => [
                    ulb.id,
                    ulb.name,
                    ulb.ward,
                    ulb.wardCode,
                    ulb.jurisdictionId,
                    ulb.jurisdiction
                ])
            ];
            const worksheet = utils.aoa_to_sheet(worksheetData);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, 'urban-local-bodies');
            const excelBuffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });
            return new Response(excelBuffer, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="urban-local-bodies.xlsx"'
                }
            });
        } else {
            const districts = await prisma.district.findMany({
                where: queryFilter,
                select: {
                    id: true,
                    name: true,
                    countryId: true,
                    country: true,
                    stateId: true,
                    state: true,
                    cityId: true,
                    city: true,
                }
            });
            const worksheetData = [
                ['id', 'name', 'lgdCode', 'countryId', 'country', 'stateId', 'state', 'cityId', 'city'],
                ...districts.map(dist => [
                    dist.id,
                    dist.name,
                    dist.countryId,
                    dist.country,
                    dist.stateId,
                    dist.state,
                    dist.cityId,
                    dist.city,
                ])
            ];
            const worksheet = utils.aoa_to_sheet(worksheetData);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, 'Districts');
            const excelBuffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });
            return new Response(excelBuffer, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename="districts.xlsx"'
                }
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ result: false, message: { roleError: error.message } }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
