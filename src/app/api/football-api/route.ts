import dbConnect, { Player } from "@/app/_utils/dbconn";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import queryString from "querystring";

const API_KEY = process.env.API_KEY;
const API_HOST = process.env.API_HOST;

export interface Player {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
        date: string;
        place: string;
        country: string;
    };
    nationality: string;
    height: string;
    weight: string;
    number: number;
    position: string;
    photo: string;
    club: string;
    marketValue: number;
}

export interface ApiResponse {
    get: string;
    parameters: {
        player: string;
    };
    results: number;
    paging: {
        current: number;
        total: number;
    };
    response: Array<{
        player: Player;
    }>;
}

export async function POST() {
    let page = 31;
    let hasMore = true;

    try {
        await dbConnect();
        while (hasMore) {
            try {
                const response = await axios.get<ApiResponse>("https://api-football-v1.p.rapidapi.com/v3/players/profiles", {
                    headers: {
                        'x-rapidapi-key': API_KEY,
                        'x-rapidapi-host': API_HOST,
                    },
                    params: { page },
                });

                const players = response.data.response.map((item) => ({
                    id: item.player.id,
                    name: item.player.name,
                    firstname: item.player.firstname,
                    lastname: item.player.lastname,
                    age: item.player.age,
                    birth: {
                        date: item.player.birth.date,
                        place: item.player.birth.place,
                        country: item.player.birth.country
                    },
                    nationality: item.player.nationality,
                    height: item.player.height,
                    weight: item.player.weight,
                    number: item.player.number,
                    position: item.player.position,
                    photo: item.player.photo
                }));

                console.log(players)
                await Player.insertMany(players);

                await new Promise((resolve) => setTimeout(resolve, 500));

                if (players.length < 250) {
                    hasMore = false;
                } else {
                    page += 1;
                }
            } catch (error) {
                console.error('Error fetching or storing players:', error);
                hasMore = false;
            }
        }
        return NextResponse.json({ message: 'Players data imported successfully' });
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json({ error: 'Failed to import players' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { page = '1', limit = '250', search = '' } = queryString.parse(req.url.split("?")[1] || '');
        
        const query = search
            ? {
                $or: [
                    { name: new RegExp(String(search), 'i') }
                ],
            }
            : {};

        const pageNum = parseInt(String(page));
        const limitNum = parseInt(String(limit));

        const players = await Player.find(query)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .exec();

        const total = await Player.countDocuments(query);

        return NextResponse.json({
            players,
            totalPages: Math.ceil(total / limitNum),
            currentPage: pageNum,
        });

    } catch (error) {
        console.error('Error fetching players:', error);
        return NextResponse.json({ error: 'Error fetching players' }, { status: 500 });
    }
}