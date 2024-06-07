import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { InsightEntity } from '../entities/insights.entity';
import { FindInsightsDto } from '../dto/find-insight';
import { CreateInsightDto } from '../dto/create-insight';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class InsightsService extends BaseService<
  InsightEntity,
  FindInsightsDto,
  CreateInsightDto
> {
  constructor(
    @InjectRepository(InsightEntity)
    private readonly insightRepository: Repository<InsightEntity>,
  ) {
    super(insightRepository, InsightsService.dtoToFindOptionsWhere, []);
  }

  static dtoToFindOptionsWhere(
    dto: FindInsightsDto = {} as FindInsightsDto,
  ): FindOptionsWhere<InsightEntity> {
    const where: FindOptionsWhere<InsightEntity> = {};
    if (dto.name) where.name = dto.name;
    if (dto.id) where.id = dto.id;
    if (dto.churchId) where.churchId = dto.churchId;
    if (dto.name) where.name = dto.name;
    if (dto.image) where.image = dto.image;
    if (dto.message) where.message = dto.message;
    // Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
    delete dto.limit;

    // You might also want to handle other properties specific to your application

    return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
  }
  async findAllInsights(dto: FindInsightsDto): Promise<InsightEntity[]> {
    return this.insightRepository.find({ relations: ['church', 'ministry', 'comments'] });
  }

  async findOneInsight(id: string): Promise<InsightEntity> {
    const insight = await this.insightRepository.findOne({ where: { id }, relations: ['church', 'ministry', 'comments'] });
    if (!insight) {
      throw new NotFoundException('Insight not found');
    }
    return insight;
  }


}
