import React, { useEffect, useRef, useState } from "react";
import { articleReq } from "@/api/article";
import { List, Tag, Card } from "@arco-design/web-react";
import MdPreviewer from "../../components/MDPreview";
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzIyOTk5NTYzLCJleHAiOjE4MDkzOTk1NjN9.6-AClRnJfP7nV54EkQEOsxVoghV599p59QZPqpA6DNs
const COLORS = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magenta',
    'gray',
];


export default () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    useEffect(() => {
        articleReq({ page, pageSize })
            .then((response) => {
                setData(response.data.data);
            })
    }, [])

    return (
        <div style={{textAlign: 'center'}}>
            <List style={{ width: '870px', margin: '0 auto', border: '1px solid #e8e8e8' }}>
                {data.map((item, index) => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            style={{ width: '100%', height: 100 }}
                            avatar={
                                <Card
                                    hoverable
                                    style={{ width: 360 }}
                                    cover={
                                        <div id={`MdPreviewer-${item.id}`} style={{ transform: 'scale(0.3)' }}>
                                            <MdPreviewer id={`MdPreviewer-${item.id}`} textValue={item.content} />
                                        </div>
                                    }
                                />
                            }
                            title={
                                <div style={{ gap: 10, display: 'flex', alignItems: 'center' }}>
                                    <Tag color={COLORS[index]} bordered>{item.titleZH}</Tag>
                                    <div>{item.titleEN}</div>
                                </div>
                            }
                            description={item.content}
                        />


                    </List.Item>
                ))}
            </List>
        </div>
    )
}
