import React, { JSX, useEffect, useState } from 'react';
import { getAccessCountReq, getFlowTableReq, getPraiseCountReq } from '@/api/public';
import { Statistic, Pagination, Switch, Table, Tag } from '@arco-design/web-react';
import { IconArrowRise, IconCheck, IconCheckCircle, IconClose, IconStop } from '@arco-design/web-react/icon';


const FlowTable = (): JSX.Element => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [onlyAccess, setOnlyAccess] = useState(false);
    const [onlyPraise, setOnlyPraise] = useState(false);

    const [accessCount, setAccessCount] = useState(0);
    const [praiseCount, setPraiseCount] = useState(0);
    const getCount = () => {
      getAccessCountReq()
        .then(res => {
          setAccessCount(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
      getPraiseCountReq()
        .then(res=>{
          setPraiseCount(res.data.data);
        })
        .catch(err=>{
          console.log(err);
        });
    }

  const getList = (p?, ps?, type?) => {
      setLoading(true);
      getFlowTableReq({
        page: p ? p : page,
        pageSize: ps ? ps : pageSize,
        type: type
      })
        .then(res => {
          setData(res.data.data);
          setLoading(false);
          setTotal(res.data.total);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    useEffect(() => {
      getCount();
      getList();
    }, []);

    const IconBoolean = (value: boolean) => value ? <IconCheckCircle style={{ color: 'green' }} /> :
      <IconStop style={{ color: 'red' }} />;

    const columns = [
      {
        title: '地址',
        dataIndex: 'address',
        children: [
          {
            title: '国家',
            dataIndex: 'country',
            align: 'center'
          },
          {
            title: '省',
            dataIndex: 'province',
            align: 'center'
          },
          {
            title: '市',
            dataIndex: 'city',
            align: 'center'
          },
          {
            title: '网络',
            dataIndex: 'isp',
            align: 'center'
          }
        ]
      },
      {
        title: '访问IP',
        dataIndex: 'IP',
        render: (value: string) => {
          return <Tag
            color={value.includes('192.168') || value.includes('127.0.0.1') || value.includes('localhost') ? 'red' : 'green'}
          >{value}</Tag>;
        }
      },
      {
        title: <div style={{display: 'flex', justifyContent: 'space-around'}}>
          访问
          <Switch
            uncheckedText={"只看"}
            checkedIcon={<IconCheck />}
            uncheckedIcon={<IconClose />}
            onChange={(checked) => {
              if (onlyPraise) {
                setOnlyPraise(false);
              }
              setOnlyAccess(checked);
              getList(page, pageSize, checked ? 'isAccess' : '');
            }}
            checked={onlyAccess}
          />
        </div>,
        dataIndex: 'isAccess',
        render: IconBoolean
      },
      {
        title: <div style={{display: 'flex', justifyContent: 'space-around'}}>
          点赞
          <Switch
            uncheckedText={"只看"}
            checkedIcon={<IconCheck />}
            uncheckedIcon={<IconClose />}
            onChange={(checked) => {
              if (onlyAccess) {
                setOnlyAccess(false);
              }
              setOnlyPraise(checked);
              getList(page, pageSize, checked ? 'isPraised' : '');
            }}
            checked={onlyPraise}
          />
        </div>,
        dataIndex: 'isPraised',
        render: IconBoolean
      },
      {
        title: '访问时间',
        dataIndex: 'createdAt',
        render: (value: string) => {
          return new Date(value).toLocaleString();
        }
      }
    ];

    const components = {
      header: {
        operations: () => [
          {
            node: (
              <th>
                <div className="arco-table-th-item">
                  ID
                </div>
              </th>
            ),
            width: 60
          }
        ]
      },
      body: {
        operations: () => [
          {
            node: (record) => <td>
              {record.id}
            </td>,
            width: 60
          }
        ]
      }
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20, padding: '0 20px' }}>
          <div>
            <Statistic
              prefix='访问统计'
              suffix={<IconArrowRise style={{color: 'green',fontSize: 24}}/>}
              countUp
              countFrom={0}
              value={accessCount}
            />
          </div>
          <div>
            <Statistic
              prefix='点赞统计'
              suffix={<IconArrowRise style={{color: 'red',fontSize: 24}}/>}
              countUp
              countFrom={0}
              value={praiseCount}
            />
          </div>
        </div>

        <Table
          scroll={{
            x: 1200
          }}
          border={{
            wrapper: true,
            cell: true
          }}
          components={components}
          columns={columns}
          data={data}
          pagination={false}
          loading={loading}
        />
        <Pagination
          showTotal
          sizeCanChange
          total={total}
          current={page}
          pageSize={pageSize}
          onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
            getList(page, pageSize);
          }}
          style={{ marginTop: 20 }}
        />
      </div>
    );
  }
;


export default FlowTable;
