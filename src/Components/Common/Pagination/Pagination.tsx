import React, { useEffect, useState } from 'react'
import style from './Pagination.module.css'

interface PaginationShape {
    totalItems: number // 总条目数
    itemsLimitPerPage: number // 每页显示的条目数
    visiblePages: number // 总共显示的分页按钮数量
    currentPage: number // 当前页码
    handlePageChange: (page: number) => void // 页码切换的回调函数
}

const Pagination: React.FC<PaginationShape> = ({
    totalItems,
    itemsLimitPerPage,
    currentPage,
    visiblePages,
    handlePageChange
}) => {
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const totalPages = Math.ceil(totalItems / itemsLimitPerPage)

    useEffect(() => {
        const updateWidth = () => {
            setWindowWidth(window.innerWidth)
        }
        updateWidth()

        window.addEventListener('resize', updateWidth)
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [])

    // 如果总页数小于等于 1，则不渲染分页组件
    if (totalPages <= 1) {
        return null
    }

    // 计算页码范围
    const halfVisible = Math.floor(visiblePages / 2)
    let startPage = Math.max(1, currentPage - halfVisible)
    let endPage = Math.min(totalPages, currentPage + halfVisible)

    // 调整范围以确保显示的页码数量等于 visiblePages
    if (endPage - startPage + 1 < visiblePages) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + visiblePages - 1)
        } else if (endPage === totalPages) {
            startPage = Math.max(1, endPage - visiblePages + 1)
        }
    }

    // 生成页码数组
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)

    return (
        <div className={style.pagination_wrapper}>
            <div className={style.pagination_container}>
                <div className={style.pagination}>
                    {/* 首页按钮 */}
                    {!(currentPage === 1) || windowWidth >= 1024 ? (
                        <button
                            className={`${style.pagination_pageButton}  ${style.display_none}`}
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(1)}
                        >
                            {windowWidth >= 1024 ? '首页' : '<<'}
                        </button>
                    ) : (
                        ''
                    )}
                    {/* 上一页按钮 */}
                    {!(currentPage === 1) || windowWidth >= 1024 ? (
                        <button
                            className={style.pagination_pageButton}
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            {windowWidth >= 1024 ? '上一页' : '<'}
                        </button>
                    ) : (
                        ''
                    )}
                    {/* 页码按钮 */}
                    {pages.map((page) => (
                        <button
                            key={page}
                            className={`${style.pagination_pageButton} ${currentPage === page ? style.active : ''}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}

                    {/* 下一页按钮 */}
                    {!(currentPage === totalPages) || windowWidth >= 1024 ? (
                        <button
                            className={style.pagination_pageButton}
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            {windowWidth >= 1024 ? '下一页' : '>'}
                        </button>
                    ) : (
                        ''
                    )}
                    {/* 末页按钮 */}
                    {!(currentPage === totalPages) || windowWidth >= 1024 ? (
                        <button
                            className={`${style.pagination_pageButton} ${style.display_none}`}
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(totalPages)}
                        >
                            {windowWidth >= 1024 ? '末页' : '>>'}
                        </button>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    )
}

export default Pagination
