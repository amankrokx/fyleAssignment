/*
<div id="user-repositories-list">
    // repositories list
</div>
<div id="user-repositories-loader" class="active">
    <img
        alt="Loading Icon"
    />
</div>
<!-- sort by older/newer -->
<div class="sort-by">
    <span>Sort By :</span>
    <button id="newest" class="active">Newest</button>
    <button id="oldest" class="">Oldest</button>
</div>
<!-- per page -->
<select id="per-page">
    <option value="10" selected>10</option>
    <option value="20">20</option>
    <option value="50">50</option>
    <option value="100">100</option>
</select>
<!-- pagination -->
<div class="pagination">
    <button id="first" class="pagination-link">
        <img alt="Previous Icon" />
    </button>
    <button id="1" class="pagination-link active">1</button>
    <button id="2" class="pagination-link">2</button>
    <button id="last" class="pagination-link">
        <img alt="Next Icon" />
    </button>
</div>
*/

import toggleElementClass from "../toggleElementClass/index.js";

// Path: client/components/paginate/index.js

class Pagination {
    /**
     * 
     * @param {Function<Promise>} callback 
     */
    constructor(callback) {
        this.callback = callback
        this.currentPage = 1
        this.totalPages = 0
        this.perPage = 10
        this.orderBy = "newest"
        toggleElementClass.addElement("newest", "newest", "active")
        toggleElementClass.addElement("oldest", "oldest", "active")
        toggleElementClass.addElement("repo-loader", "user-repositories-loader", "active")
        // onclick in .pagination
        this.pagination = document.querySelector(".pagination")
        this.pagination.addEventListener("click", event => {
            let target = event.target
            // if event.target is an img tag, then get to its immediate parent
            if (target.tagName === "IMG") target = event.target.parentElement
            if (target.classList.contains("pagination-link")) this.goToPage(target.id)
        })
        // onclick in #per-page
        document.querySelector("#per-page").addEventListener("change", event => {
            this.perPage = parseInt(event.target.value)
            this.currentPage = 1
            this.render()
            this.fireCallback()
        })
        // onclick in .sort-by
        document.querySelector(".sort-by").addEventListener("click", event => {
            if (event.target.classList.contains("active")) return
            toggleElementClass.toggle("newest")
            toggleElementClass.toggle("oldest")
            // get the id of the clicked button
            const id = event.target.id
            // update the page info
            this.orderBy = id === "newest" ? "newest" : "oldest"
            this.currentPage = 1
            this.render()
            this.fireCallback()
        })

        // this.fireCallback()
    }

    /**
     *
     * @param {Object} pageInfo
     * @param {number} pageInfo.first
     * @param {number} pageInfo.prev
     * @param {number} pageInfo.next
     * @param {number} pageInfo.last
     * @param {number} pageInfo.perPage
     * @param {("newest"|"oldest")} pageInfo.orderBy
     */
    updateValues(pageInfo) {
        console.log(pageInfo)
        this.totalPages = pageInfo.last || (pageInfo.prev ? pageInfo.prev + 1 : pageInfo.next - 1)
        if (pageInfo.orderBy === "newest") {
            toggleElementClass.hide("oldest")
            toggleElementClass.show("newest")
        } else {
            toggleElementClass.hide("newest")
            toggleElementClass.show("oldest")
        }
        document.querySelector("#per-page").value = pageInfo.perPage
        this.currentPage = (pageInfo.next) ? 
                                pageInfo.next - 1
                                :
                                (pageInfo.prev) ?
                                    pageInfo.prev + 1
                                    :
                                    1
        
        this.render()
    }

    goToPage(pageNumber) {
        console.log("goto page: ", pageNumber)
        if (pageNumber === "first" || pageNumber === "last") 
            this.currentPage = pageNumber === "first" ? 1 : this.totalPages
        else pageNumber = parseInt(pageNumber)
        if (pageNumber && (pageNumber >= 1 && pageNumber <= this.totalPages))
            this.currentPage = pageNumber

        this.render()
        this.fireCallback()
    }

    render() {
        let html = `<button id="first" class="pagination-link"><img alt="Previous Icon" /></button>`
        for (let i = 1; i <= this.totalPages; i++)
            html += `<button id="${i}" class="pagination-link ${i === this.currentPage ? "active" : ""}">${i}</button>`
        html += `<button id="last" class="pagination-link"><img alt="Next Icon" /></button>`

        this.pagination.innerHTML = html

        // this.fireCallback()
    }

    async fireCallback() {
        toggleElementClass.show("repo-loader")
        await this.callback({
            page: this.currentPage,
            perPage: this.perPage,
            orderBy: this.orderBy,
        })
        toggleElementClass.hide("repo-loader")
    }
}

export default Pagination