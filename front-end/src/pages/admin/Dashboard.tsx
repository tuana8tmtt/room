import { Breadcrumb, Col, Layout, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { Line, G2, Column } from '@ant-design/plots';

import { each, findIndex } from '@antv/util';
import { list } from '../../api/contract';
import { ContractType } from '../types/contract';
import moment from 'moment';

type Props = {}

const Dashboard = (props: Props) => {
    const { InteractionAction, registerInteraction, registerAction } = G2;
    const [products, setProducts] = useState<any>();

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await list();
            setProducts(data);
        }
        getProducts();
    }, [])

    const get12Month = [...Array.from(Array(12).keys())].map(index => {
        const date = new Date();
        date.setMonth(date.getMonth() - (index));

        return date;
    });
    const Month12 = get12Month.map((item) => moment(item).format("MM/YYYY"))
    Month12.reverse()

    const data1 = [
        {
            year: '1991',
            value: 3,
        },
    ];
    console.log(products);

    const data = Month12?.map((product, index) => {
        return {
            year: product,
            value: products?.filter((pay: any) => { return moment(pay.createdAt).format("MM/YYYY") === product }).length
        }
    })
    G2.registerShape('point', 'custom-point', {
        draw(cfg, container) {
            const point = {
                x: cfg.x,
                y: cfg.y,
            };
            const group = container.addGroup();
            group.addShape('circle', {
                name: 'outer-point',
                attrs: {
                    x: point.x,
                    y: point.y,
                    fill: cfg.color || 'red',
                    opacity: 0.5,
                    r: 6,
                },
            });
            group.addShape('circle', {
                name: 'inner-point',
                attrs: {
                    x: point.x,
                    y: point.y,
                    fill: cfg.color || 'red',
                    opacity: 1,
                    r: 2,
                },
            });
            return group;
        },
    });

    class CustomMarkerAction extends InteractionAction {
        active() {
            const view = this.getView();
            const evt = this.context.event;

            if (evt.data) {
                // items: 数组对象，当前 tooltip 显示的每条内容
                const { items } = evt.data;
                const pointGeometries = view.geometries.filter((geom) => geom.type === 'point');
                each(pointGeometries, (pointGeometry) => {
                    each(pointGeometry.elements, (pointElement, idx) => {
                        const active = findIndex(items, (item) => item.data === pointElement.data) !== -1;
                        const [point0, point1] = pointElement.shape.getChildren();

                        if (active) {
                            // outer-circle
                            point0.animate(
                                {
                                    r: 10,
                                    opacity: 0.2,
                                },
                                {
                                    duration: 1800,
                                    easing: 'easeLinear',
                                    repeat: true,
                                },
                            ); // inner-circle

                            point1.animate(
                                {
                                    r: 6,
                                    opacity: 0.4,
                                },
                                {
                                    duration: 800,
                                    easing: 'easeLinear',
                                    repeat: true,
                                },
                            );
                        } else {
                            this.resetElementState(pointElement);
                        }
                    });
                });
            }
        }

        reset() {
            const view = this.getView();
            const points = view.geometries.filter((geom) => geom.type === 'point');
            each(points, (point) => {
                each(point.elements, (pointElement) => {
                    this.resetElementState(pointElement);
                });
            });
        }

        resetElementState(element) {
            const [point0, point1] = element.shape.getChildren();
            point0.stopAnimate();
            point1.stopAnimate();
            const { r, opacity } = point0.get('attrs');
            point0.attr({
                r,
                opacity,
            });
            const { r: r1, opacity: opacity1 } = point1.get('attrs');
            point1.attr({
                r: r1,
                opacity: opacity1,
            });
        }

        getView() {
            return this.context.view;
        }
    }

    registerAction('custom-marker-action', CustomMarkerAction);
    registerInteraction('custom-marker-interaction', {
        start: [
            {
                trigger: 'tooltip:show',
                action: 'custom-marker-action:active',
            },
        ],
        end: [
            {
                trigger: 'tooltip:hide',
                action: 'custom-marker-action:reset',
            },
        ],
    });
    const config = {
        data,
        xField: 'year',
        yField: 'value',
        label: {},
        point: {
            size: 5,
            shape: 'custom-point',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: {
            showMarkers: false,
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'custom-marker-interaction',
            },
        ],
    };
    const dataCollum = [
        {
            name: 'London',
            月份: 'Jan.',
            月均降雨量: 18.9,
        },
        {
            name: 'London',
            月份: 'Feb.',
            月均降雨量: 28.8,
        },
        {
            name: 'London',
            月份: 'Mar.',
            月均降雨量: 39.3,
        },
        {
            name: 'London',
            月份: 'Apr.',
            月均降雨量: 81.4,
        },
        {
            name: 'London',
            月份: 'May',
            月均降雨量: 47,
        },
        {
            name: 'London',
            月份: 'Jun.',
            月均降雨量: 20.3,
        },
        {
            name: 'London',
            月份: 'Jul.',
            月均降雨量: 24,
        },
        {
            name: 'London',
            月份: 'Aug.',
            月均降雨量: 35.6,
        },
        {
            name: 'Berlin',
            月份: 'Jan.',
            月均降雨量: 12.4,
        },
        {
            name: 'Berlin',
            月份: 'Feb.',
            月均降雨量: 23.2,
        },
        {
            name: 'Berlin',
            月份: 'Mar.',
            月均降雨量: 34.5,
        },
        {
            name: 'Berlin',
            月份: 'Apr.',
            月均降雨量: 99.7,
        },
        {
            name: 'Berlin',
            月份: 'May',
            月均降雨量: 52.6,
        },
        {
            name: 'Berlin',
            月份: 'Jun.',
            月均降雨量: 35.5,
        },
        {
            name: 'Berlin',
            月份: 'Jul.',
            月均降雨量: 37.4,
        },
        {
            name: 'Berlin',
            月份: 'Aug.',
            月均降雨量: 42.4,
        },
    ];
    const configCollum = {
        dataCollum,
        isGroup: true,
        xField: '月份',
        yField: '月均降雨量',
        seriesField: 'name',

        /** 设置颜色 */
        //color: ['#1ca9e6', '#f88c24'],

        /** 设置间距 */
        // marginRatio: 0.1,
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'middle', 'bottom'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                    type: 'adjust-color',
                },
            ],
        },
    };
    return (
        <div>
            <Layout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Dasboard</Breadcrumb.Item>
                </Breadcrumb>

                <Content
                    className="site-layout-background"
                    style={{
                        margin: 0,
                        minHeight: 100,
                        backgroundColor: 'white'
                    }}>
                    <div style={{ minHeight: 300, }}>
                        <Row >
                            <Col span={12} style={{ paddingRight: '20px', textAlign: 'center' }}>
                                <div>
                                    <Line {...config} />
                                </div>
                                <p>Number of Contract</p>
                            </Col>
                            <Col span={12} style={{ textAlign: 'center' }}>
                                <div>
                                    <Line {...config} />
                                </div>
                                <p>Revenua</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Column data={dataCollum} {...configCollum} />
                                <p>Income And Expendture</p>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>

        </div>
    )
}

export default Dashboard