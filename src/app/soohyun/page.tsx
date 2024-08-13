"use client";

import React, { useEffect, useState } from 'react';
import Cardmonthly from '../../components/cardmonthly/CardMonthly';
import Cardmy from '../../components/cardmy/CardMy';
import AromaTag from '@/components/aromatag/AromaTag'
import { wineListAPI, wineDetail } from "@/api/Wine";
import { winListType, wineDetailType } from "@/types/WineProps";

const App: React.FC = () => {
    const [wineList, setWineList] = useState<winListType[]>([]);
    const [detail, setDetail] = useState<wineDetailType>();

    useEffect(() => {
        const fetchWineList = async () => {
            try {
                const response = await wineListAPI(999999);
                setWineList(response.list);
                console.log(response.list);
            } catch (error) {
                console.error("Error fetching wine list:", error);
            }
        };

        fetchWineList();
    }, []);

    useEffect(() => {
        const fetchWineMy = async () => {
            try {
                const response = await wineDetail(33);
                setDetail(response);
                console.log(response);
            } catch (error) {
                console.error("Error fetching wine detail:", error);
            }
        };

        fetchWineMy();
    }, []); // 빈 배열을 의존성 배열로 설정하여 컴포넌트 마운트 시에만 실행

    return (
        <div>
            {/* {wineList.map((wine) => (
                <Cardmonthly key={wine.id}
                    image={wine.image}
                    avgRating={wine.avgRating}
                    name={wine.name}
                />
            ))} */}
            {detail !== undefined && detail.reviews.map((d) => (
                <Cardmy key={d.id}
                    rating={d.rating}
                    createdAt={d.createdAt}
                    name={detail.name}
                    content={d.content} />
            ))}
            {/* <AromaTag option="view" /> */}
        </div>
    );
};

export default App;
