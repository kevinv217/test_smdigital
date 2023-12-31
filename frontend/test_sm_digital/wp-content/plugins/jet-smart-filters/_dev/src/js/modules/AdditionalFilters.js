import eventBus from 'includes/event-bus';
import {
	getProviderFilters
} from 'includes/utility';

export default class AdditionalFilters {
	filters = [];

	constructor(filterGroup) {
		this.filterGroup = filterGroup;

		this.collectFilters();

		// Event subscriptions
		eventBus.subscribe('fiter/apply', parentFilter => {
			if (!this.isCurrentAdditionalProvider(parentFilter) || parentFilter.isReload)
				return;

			this.changeByParent(parentFilter);
		}, true);
		eventBus.subscribe('fiters/apply', parentApplyFilter => {
			if (!this.isCurrentAdditionalProvider(parentApplyFilter) || parentApplyFilter.isReload)
				return;

			this.applyFiltersByParent(parentApplyFilter);
		}, true);
		eventBus.subscribe('fiters/remove', parentRemoveFilter => {
			if (!this.isCurrentAdditionalProvider(parentRemoveFilter) || parentRemoveFilter.isReload)
				return;

			this.removeByParent(parentRemoveFilter);
		}, true);
		eventBus.subscribe('ajaxFilters/updated', (provider, queryId) => {
			if (!this.filterGroup.isCurrentProvider({ provider, queryId }))
				return;

			this.filterGroup.additionalRequest = false;
		}, true);
	}

	changeByParent(parentFilter) {
		const additionalFilter = this.findInCollection(parentFilter);

		if (!additionalFilter)
			return;

		additionalFilter.data = parentFilter.data;
		if (parentFilter.isHierarchy)
			this.updateHierarchyLevelsByParent(parentFilter);

		this.filterGroup.additionalRequest = true;
		this.filterGroup.applyFilterHandler(parentFilter.applyType);
	}

	applyFiltersByParent(parentApplyFilter) {
		this.parentProviderCurrentFilters(parentApplyFilter.provider, parentApplyFilter.queryId).forEach(parentFilter => {
			const additionalFilter = this.findInCollection(parentFilter);

			if (!additionalFilter)
				return;

			additionalFilter.data = parentFilter.data;
			if (parentFilter.isHierarchy)
				this.updateHierarchyLevelsByParent(parentFilter);
		});

		this.filterGroup.additionalRequest = true;
		this.filterGroup.applyFiltersHandler(parentApplyFilter.applyType);
	}

	removeByParent(parentRemoveFilter) {
		this.resetFilters();
		this.filterGroup.additionalRequest = true;
		this.filterGroup.removeFiltersHandler(parentRemoveFilter.applyType);
	}

	collectFilters() {
		this.filters = [];

		this.filterGroup.filters.forEach(filter => {
			if (filter.isAdditional)
				this.filters.push(filter);
		});

		this.updateProvider();
	}

	updateProvider() {
		if (!this.filters.length)
			return;

		this.filterGroup.currentQuery = {};
		this.filterGroup.doAjax();
	}

	parentProviderCurrentFilters(provider, queryId) {
		return getProviderFilters(provider, queryId).filter(parentFilter => {
			return this.isCurrentAdditionalProvider(parentFilter);
		});
	}

	resetFilters() {
		this.filters.forEach(filter => {
			filter.data = false;
		});
	}

	findInCollection(parentFilter) {
		return this.filters.find(collectionFilter => {
			return getPropertiesKey(parentFilter) === getPropertiesKey(collectionFilter);
		});

		function getPropertiesKey(filter) {
			return filter.name + '|' + filter.filterId + '|' + filter.queryKey;
		}
	}

	isCurrentAdditionalProvider(parentFilter) {
		if (!parentFilter.additionalProviders || !Array.isArray(parentFilter.additionalProviders))
			return false;

		return parentFilter.additionalProviders.includes(this.filterGroup.providerKey) ? true : false;
	}

	updateHierarchyLevelsByParent(parentFilter) {
		parentFilter.hierarchicalInstance.filters.forEach(parentFilter => {
			const filter = this.filters.find(filter => {
				return filter.filterId === parentFilter.filterId && filter.depth === parentFilter.depth;
			});

			filter.data = parentFilter.data;
		});
	}
}